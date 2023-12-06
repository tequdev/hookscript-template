import { SetHookFlags, xrpToDrops } from '@transia/xrpl'
import { createHookPayload, setHooksV3, SetHookParams, Xrpld } from '@transia/hooks-toolkit'
import { XrplIntegrationTestContext, serverUrl, setupClient } from '@transia/hooks-toolkit/dist/npm/src/libs/xrpl-helpers'

export async function main(): Promise<void> {
  const testContext = (await setupClient(
    serverUrl
  )) as XrplIntegrationTestContext

  const client = testContext.client
  const aliceWallet = testContext.alice
  const bobWallet = testContext.bob

  const hook = createHookPayload(0, 'index', 'ns', SetHookFlags.hsfOverride, [
    'Invoke', 'Payment'
  ])

  await setHooksV3({
    client: client,
    seed: aliceWallet.seed,
    hooks: [{ Hook: hook }],
  } as SetHookParams)
  
  await Xrpld.submit(client, {
    tx: {
      Account: bobWallet.address,
      TransactionType: 'Payment',
      Destination: aliceWallet.address,
      Amount: xrpToDrops(1),
    },
    wallet: bobWallet,
  })

  await client.disconnect()
}

main()

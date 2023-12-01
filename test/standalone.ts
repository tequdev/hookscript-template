import { SetHookFlags } from '@transia/xrpl'
import { createHookPayload, setHooksV3, SetHookParams } from '@transia/hooks-toolkit'
import { XrplIntegrationTestContext, serverUrl, setupClient } from '@transia/hooks-toolkit/dist/npm/src/libs/xrpl-helpers'

export async function main(): Promise<void> {
  const testContext = (await setupClient(
    serverUrl
  )) as XrplIntegrationTestContext

  const client = testContext.client
  const aliceWallet = testContext.alice

  const hook = createHookPayload(0, 'index', 'ns', SetHookFlags.hsfOverride, [
    'Invoke',
  ])

  await setHooksV3({
    client: client,
    seed: aliceWallet.seed,
    hooks: [{ Hook: hook }],
  } as SetHookParams)

  await client.disconnect()
}

main()

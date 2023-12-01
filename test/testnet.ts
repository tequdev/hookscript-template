import { Client, SetHookFlags } from '@transia/xrpl'
import { createHookPayload, setHooksV3, SetHookParams } from '@transia/hooks-toolkit'

export async function main(): Promise<void> {
  const serverUrl = 'wss://xahau-test.net'
  const client = new Client(serverUrl)
  await client.connect()
  client.networkID = await client.getNetworkID()

  const aliceWallet = (await client.fundWallet()).wallet

  const hook = createHookPayload(0, 'index', 'ns', SetHookFlags.hsfOverride, [
    'Payment',
  ])

  await setHooksV3({
    client: client,
    seed: aliceWallet.seed,
    hooks: [{ Hook: hook }],
  } as SetHookParams)

  await client.disconnect()
}

main()

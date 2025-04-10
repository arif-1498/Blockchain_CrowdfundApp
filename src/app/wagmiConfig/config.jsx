import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { mainnet, sepolia, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, metaMask} from 'wagmi/connectors'

export function getConfig() {
  createConfig({
    chains: [baseSepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [baseSepolia.id]: http(),
    },
    connectors: [
      injected(),
      coinbaseWallet(),
      metaMask()
     
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
  })

}

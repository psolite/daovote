import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

// 0. Set up Solana Adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const metadata = {
  name: 'DAOVOTE',
  description: 'DAO Voting system',
  url: 'https://daovote.fun',
  icons: ['https://daovote.fun/favicon.ico']
}

// Create modal
createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solanaDevnet], // only use devnet for testing
  // networks: [solana, solanaTestnet, solanaDevnet],
  metadata: metadata,
  projectId: projectId as string,
  features: {
    analytics: true,
    email: false,
    socials: []
  },
  themeMode: 'dark',
})

const AppKit = () => {
  return (
    <div>
      <appkit-button />
    </div>
  );
};

export default AppKit;
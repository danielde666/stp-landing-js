import "../styles/globals.css";

import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { AppProps } from "next/app";

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_NODE_ALCHEMY_KEY,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector(),
    new WalletConnectConnector({
      options: {
        qrcode: true,
        rpc: {
          1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_NODE_ALCHEMY_KEY}`,
        },
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: "stp-home",
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_NODE_ALCHEMY_KEY}`,
      },
    }),
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;

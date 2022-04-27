/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

import "regenerator-runtime/runtime";
import Navbar from "./navbar";

import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3Modal from "web3modal";
import WalletLink from "walletlink";

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [1337, 4];

  const connectors = {
    injected: {},
    walletconnect: {
      rpc: "https://mainnet.infura.io/v3/765d4237ce7e4d999f706854d5b66fdc",
      chainId: 1,
    },
    walletlink: {
      rpc: "https://mainnet.infura.io/v3/765d4237ce7e4d999f706854d5b66fdc",
      chainId: 1,
    },
  };

  if (process.browser) {
    const ethereumButton = document.getElementById(".enableEthereumButton");
    const showAccount = document.getElementById(".showAccount");

    ethereumButton?.ethereumButton.addEventListener("click", () => {
      getAccount();
    });

    async function getAccount() {
      var web3 = new Web3(window.ethereum);

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
  }

  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;

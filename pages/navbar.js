import { useWeb3 } from "@3rdweb/hooks";
/* pages/_app.js */
import Link from "next/link";

import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3Modal from "web3modal";
import WalletLink from "walletlink";

export default function Navbar() {
  const { connectWallet, address, error } = useWeb3();

  error ? console.log(error) : null;

  return (
    <nav className="border-b p-6">
      <p className="text-4xl font-bold">Bazzar</p>
      <div className="flex mt-4 flex items-center justify-center">
        <Link href="/">
          <a className="mr-4 text-pink-500">Home</a>
        </Link>
        <Link href="/create-nft">
          <a className="mr-6 text-pink-500">Sell NFT</a>
        </Link>
        <Link href="/my-nfts">
          <a className="mr-6 text-pink-500">My NFTs</a>
        </Link>
        <Link href="/dashboard">
          <a className="mr-6 text-pink-500">Dashboard</a>
        </Link>
        <Link href="/exchange">
          <a className="mr-6 text-pink-500">Coin Market</a>
        </Link> 
        <div className="mr-6 text-pink-500">
          {address ? (
            <p className="mr-6 text-pink-500">{address}</p>
          ) : (
            <button
              className="mr-4 mt-0 text-white-500  bg-pink-500 text-white font-bold py-2 px-8 rounded flex items-center justify-center float-right"
              onClick={() => connectWallet("injected" || "walletconnect")}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

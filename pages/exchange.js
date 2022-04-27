import { useState, useEffect } from "react";
import CoinList from "./CoinList";
import Searchbar from "./search";

export default function Exchange() {
  const [coins, setCoins] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
    e.preventDefault();

    console.log("search:", search);
  };

  useEffect(() => {
    loadCoins();
    filteredCoins;
  }, []);
  async function loadCoins() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const coinsData = await res.json();
    setCoins(coinsData);
    setLoadingState("loaded");
    console.log("coinsData:", coinsData);
  }

  return (
    <div className="coin__app">
      <Searchbar type="text" placeholder="Search" onChange={handleChange} />
      {loadingState === "loaded" ? (
        <CoinList coinsData={filteredCoins} />
      ) : (
        <div>Loading...</div>
      )}

      {/* <CoinList coinsData={coinsData} /> */}
    </div>
  );
}
// export async function getServerSideProps() {}

import { useEffect } from "react/cjs/react.production.min";
import Coins from "./Coins";
const CoinList = ({ coinsData }) => {
  return (
    <>
      {coinsData.map((coin) => {
        return (
          <Coins
            key={coin.id}
            name={coin.name}
            id={coin.id}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </>
  );
};

export default CoinList;

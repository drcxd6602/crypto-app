import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loading from "./Loading";
import CoinCard from "./CoinCard";

const Coins = ({ curr }) => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState("1");
  const currency_symbole =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      const resource = `${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=100`;
      console.log(resource);
      const { data } = await axios.get(resource);
      console.log(data);
      setCoin(data);
      setLoading(false);
    };
    fetchCoins();
  }, [currency, page]);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <RadioGroup value={currency} p={"8"} onChange={setCurrency}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"}>
            {coin.map((item) => (
              <CoinCard
                id={item.id}
                key={item.id}
                name={item.name}
                img={item.image}
                symbole={item.symbol}
                current_price={item.current_price}
                currency_symbole={currency_symbole}
              />
            ))}
          </HStack>

          <HStack w={"full"} p={"8"} overflow={"auto"}>
            {btns.map((item, index) => (
              <Button
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;




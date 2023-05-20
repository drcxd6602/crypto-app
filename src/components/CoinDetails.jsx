import {
  Box,
  Container,
  Radio,
  HStack,
  RadioGroup,
  VStack,
  Stack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Loading from "./Loading";
import axios from "axios";
import { server } from "../index.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PriceChart from "./PriceChart";


const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState('24h');
  const [chartArr, setChartArr] = useState([]);
  const currency_symbole =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const params = useParams();
  console.log(server);
  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '365d'];

  useEffect(() => {
    console.log(server);

    const fetchCoin = async () => {
      const source = `${server}/coins/${params.id}`;
      const chartSrc = `${source}/market_chart?vs_currency=${currency}&days=${days}`
      const { data } = await axios.get(source);
      const { data: chartData } = await axios.get(chartSrc)
      setChartArr(chartData.prices)
      console.log(chartData);
      setCoin(data);
      setLoading(false);
    };

    fetchCoin();
  }, [params.id, currency, days]);

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  }

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
          <Stack direction={['column','row']}>
            <Box boxShadow={"base"} w={"fit-content"}>
              <VStack spacing={"4"} p={"16"} alignItems={"center"}>
                <Text fontSize={"small"} alignSelf={"ceneter"} opacity={"0.7"}>
                  Last Updated on{" "}
                  {Date(coin.market_data.last_updated).split("G")[0]}
                </Text>
                <Image
                  src={coin.image.large}
                  w={"16"}
                  h={"16"}
                  objectFit={"contain"}
                />
                <Stat>
                  <StatLabel>{coin.name}</StatLabel>
                  <StatNumber>
                    {currency_symbole}
                    {coin.market_data.current_price[`${currency}`]}
                  </StatNumber>
                </Stat>

                <VStack
                  w={"fit-content"}
                  alignItems={"streach"}
                  fontSize={"1xl"}
                >
                  <Stat>
                    <StatHelpText fontSize={"1xl"}>
                      <StatArrow
                        type={
                          coin.market_data.price_change_percentage_24h > 0
                            ? "increase"
                            : "decrease"
                        }
                        transform={"scale(2)"}
                      >
                        {" "}
                      </StatArrow>
                      {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                  </Stat>
                  <Badge
                    fontSize={"2xl"}
                    bgColor={"blackAlpha.900"}
                    color={"whiteAlpha.900"}
                    w={"fit-content"}
                  >{`#${coin.market_cap_rank}`}</Badge>

                  <CustomBar
                    high={`${currency_symbole}${coin.market_data.high_24h[currency]}`}
                    low={`${currency_symbole}${coin.market_data.high_24h[currency]}`}
                  />

                  <Box w={"full"}>
                    <Item
                      title={"Max Supply"}
                      value={
                        coin.market_data.max_supply
                          ? coin.market_data.max_supply
                          : "Undifined"
                      } //circulating_supply
                    />
                    <Item
                      title={"All time low"}
                      value={coin.market_data.atl[currency]}
                    />
                    <Item
                      title={"All time High"}
                      value={coin.market_data.ath[currency]}
                    />
                    <Item />
                  </Box>
                </VStack>
              </VStack>
              </Box>
              
              <Box w={'full'} borderWidth={1}>
                
                <PriceChart arr={chartArr} currency={currency_symbole} days={days} />
                <HStack wrap={'wrap'}  overflow={'auto'} >
                  {
                    btns.map((item) => (
                      <Button key={item} onClick={()=>switchChartStats(item)}  colorScheme = 'blackAlpha' w={['8', '16']} >
                        {item}
                      </Button>
                    ))
                  }
                </HStack>
              </Box>
          </Stack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack
    justifyContent={"space-between"}
    w={"full"}
    my={"4"}
    fontFamily={"monospace"}
    fontWeight={"bold"}
    fontSize={'1xl'}
  >
    <Text>{title}</Text>
    <Text>{value}</Text>
  </HStack>
);


const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme="teal" w={"full"} borderRadius={'5'} />
    <HStack>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={'smaller'}>24H Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;

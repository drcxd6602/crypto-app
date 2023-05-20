import {
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({
    id, 
  name,
  img,
  symbole,
  current_price,
  currency_symbole = "₹",
}) => (
  <Link to={`coin/${id}`} target="blank">
    <VStack
      w={"52"}
      shadow={'2xl'}
      padding={"8"}
      borderRadius={"lg"}
      transition={"all 0.5s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"20"}
        objectFit={"contain"}
        alt="Exchange Image"
      />

      <Heading size={"md"} noOfLines={"1"}>
        {symbole}
      </Heading>
      <Text noOfLines={"1"}>{name}</Text>
      <Text noOfLines={"1"} fontWeight={"bold"}>
        {current_price ? `${currency_symbole}${current_price}` : "NA"}
      </Text>
    </VStack>
  </Link>
);

export default CoinCard;
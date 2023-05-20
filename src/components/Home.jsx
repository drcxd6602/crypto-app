import { Text, Box, Image } from '@chakra-ui/react'
import React from 'react'
import bgImg from "../assets/crypto-app-bg.png"
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.800"} h={"90vh"} w={"full"} pos={"relative"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "30px",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image src={bgImg} w={"full"} h={"full"} objectFit={"contain"} />
      </motion.div>

      <Text
        color={"white"}
        position={"absolute"}
        left={"0"}
        right={"0"}
        marginLeft={"auto"}
        marginRight={"auto"}
        w={["300px", "700px"]}
        bgColor={"blackAlpha.500"}
        p={"4"}
        fontSize={["3xl", "6xl"]}
        bottom={"40%"}
        textAlign={"center"}
        fontWeight={"bold"}
        borderTopLeftRadius={"full"}
        borderBottomRightRadius={"full"}
      >
        DRC CryptoHub
      </Text>
    </Box>
  );
}

export default Home

import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import ColorModeSwitcher from '../ColorModeSwitcher';

const Header = () => {
  return (
    <HStack p={"4"}
      bgColor={"blackAlpha.900"}
      shadow={"base"}
      position={'sticky'}
      top={'0'}
      zIndex={1}
    >
      <ColorModeSwitcher />
      
      <Button variant={"unstyled"} color="white">
        <Link to="/"> Home </Link>
      </Button>
      <Button variant={"unstyled"} color="white">
        <Link to="/coins"> Coins </Link>
      </Button>
      <Button variant={"unstyled"} color="white">
        <Link to="/exchanges"> Exchanges </Link>
      </Button>
      
      

    </HStack>
  );
}

export default Header
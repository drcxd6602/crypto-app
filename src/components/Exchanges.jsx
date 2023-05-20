import { Container, HStack, Heading, Image, Text, VStack} from '@chakra-ui/react';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { server } from '../index';
import Loading from './Loading';

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExchanges = async () => {
            const { data } = await axios.get(`${server}/exchanges`);
            console.log(data);
            setExchanges(data);
            setLoading(false);
        };
        fetchExchanges();
    }, []);

  return (
      <Container maxW={'container.xl'}>
          {
              loading ? (<Loading />) : (
                  <>
              
              <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                  {
                      exchanges.map((item) => (
                          <ExchangeCard key={item.id}
                              name={item.name}
                              img={item.image}
                              rank={item.test_score_rank}
                              url={item.url} />
                      ))
                  }
              </HStack>
          </>)}
      </Container>
  )
}

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="blank">
        <VStack w={'52'} shadow={'lg'} padding={'8'} borderRadius={'lg'} transition={'all 0.5s'} m={'4'} css={
            {
                "&:hover": {
                    transform: "scale(1.1)"
                }
            }
    } >
      <Image
        src={img}
        w={"10"}
        h={"20"}
        objectFit={"contain"}
            alt="Exchange Image"
                
      />

      <Heading size={"md"} noOfLines={"1"}>
        {rank}
      </Heading>
      <Text noOfLines={"1"}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges

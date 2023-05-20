import { VStack, Box, Spinner, Heading} from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <VStack h={'90vh'} justifyContent={'center'} >
      <Box transform = {'scale(3)'} >
        <Spinner size={'xl'}/>
      </Box>
      <Heading p={'8'}>Just a sec...</Heading>
    </VStack>
  )
}

export default Loading

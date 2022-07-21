import { Box, Text } from "@chakra-ui/react";

function DashboardCard({ title, number, color , icon }) {
  return (
  
      <>
      
        <Box padding={'2em'}  bg={'#fff'} 
        width={['100%']} 
        borderLeft={`0.3em solid ${color}`} 
        borderRadius={'0.2em'} >
            <Text mb={'1em'}>
             {icon}
            </Text>
            <Text fontWeight={'bold'}>{title}</Text>
            <Text>{number}</Text>
            
          
        </Box>

      </>
   
  );
}

export default DashboardCard;

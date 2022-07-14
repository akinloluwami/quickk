
import { UnorderedList , Box, ListItem , Text } from '@chakra-ui/react';
import BarItems from '../../../utils/BarContent';
import { Link } from 'react-router-dom';
const MobileNav = () => {

    return (
        <>

            <Box bg={'#fff'} py={'1.5em'} px={'1em'}>
                {/* display items from sidebar  */}
                <UnorderedList display={'flex'} justifyContent={'space-between'}>
                    {
                        BarItems.map ( ( items , index ) => {
                            const {name , link , icon} = items;
                            return (
                                <>
                                    <Link to={link} key={index}>
                                        <ListItem alignItems={'center'} display={'flex'} gap={'1em'} flexDirection={'column'} >
                                            <Text fontSize={'1.2em'}>{icon}</Text>
                                            <Text fontSize={'0.8em'} >{name}</Text>
                                        </ListItem>
                                    </Link>
                                </>
                            )
                        })
                    }
                </UnorderedList>
            </Box>
        
        </>
    )

}

export default MobileNav;
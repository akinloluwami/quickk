import { Box , Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProfileFooter = () => {

    return (
        <>


            <Box display={'flex'} my={"5em"} justifyContent={'center'}>
               <Link to={'/'}>
               <Image
                    src={
                      "https://res.cloudinary.com/dhkccnvyn/image/upload/v1658534732/quick/dashboard_zosbzh.svg"
                    }
                  />
               </Link>
            </Box>
        
        </>
    )
}

export default ProfileFooter ;
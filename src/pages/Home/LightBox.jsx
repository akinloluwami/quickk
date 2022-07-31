import ContainerLayout from "../../Layouts/ContainerLayout.jsx/ContainerLayout"

import {Flex , Box ,Image, Text} from '@chakra-ui/react'
const LightBox  = () => {

    const items = [
        {
            title : 'Create Microblog',
            description : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt ad corrupti odio dolor. Nihil itaque, nulla facere neque cum quos quisquam doloremque similique voluptate vel harum sequi dignissimos beatae minima?',
            icon : 'https://res.cloudinary.com/dhkccnvyn/image/upload/v1657319726/secuWallet/Group_28_zlvsir.svg',
            style : {
                background : '#f5f5f5',
            }
        },
        {
            title : 'Accept Donations in Crypto',
            description : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt ad corrupti odio dolor. Nihil itaque, nulla facere neque cum quos quisquam doloremque similique voluptate vel harum sequi dignissimos beatae minima?',
            icon : 'https://res.cloudinary.com/dhkccnvyn/image/upload/v1657319726/secuWallet/Group_28_zlvsir.svg',
            style : {
                background : '#f5f5f5',
            }
        },
        {
            title : 'Create Microblog',
            description : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt ad corrupti odio dolor. Nihil itaque, nulla facere neque cum quos quisquam doloremque similique voluptate vel harum sequi dignissimos beatae minima?',
            icon : 'https://res.cloudinary.com/dhkccnvyn/image/upload/v1657319726/secuWallet/Group_28_zlvsir.svg',
            style : {
                background : '#f5f5f5',
            }
        }
    ]

    return (
        <>

            <ContainerLayout>
                <Text my={'2em'} fontWeight={'bold'} fontFamily={'var(--primary-font)'} 
                    textAlign={'center'} 
                    fontSize={['xl','3xl']}
            
                > Know More About Quickk</Text>

                <Box>

                 <Flex flexDir={['column' , 'row']} 
                 gap={['2em']} textAlign={'center'}
                   
                 >
                    {
                        items.map ( (items , index ) => {
                            return (
                                <>
                                

                                    <Box  style={items.style} px={'1em'} py={'1em'}
                                        borderRadius={'10px'}
                                    >
                                        <Image w={['30%','25%']} src={items.icon} mx={'auto'} />
                                        <Text my={'1em'} fontWeight={'black'}>{items.title}</Text>
                                        <Text>{items.description}</Text>
                                    </Box>
                                
                                
                                </>
                            )
                        })
                    }
                 </Flex>

                </Box>

            </ContainerLayout>
        
        </>
    )

}

export default LightBox
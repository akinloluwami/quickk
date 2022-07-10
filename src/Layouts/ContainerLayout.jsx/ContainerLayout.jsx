import { Container } from "@chakra-ui/react";

const ContainerLayout = ({ children }) => {

    return (
        <>
        
            <Container maxW={['100%', '80%']}>
                {children}
            </Container>
        </>
    )

}

export default ContainerLayout;
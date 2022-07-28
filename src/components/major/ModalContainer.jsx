import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const ModalContainer = ({ children }) => {

    return (
        <>
        
            <Modal>
                <ModalOverlay/>
                <ModalContent>
                    {children}
                </ModalContent>
            </Modal>
        
        </>
    )

}

export default ModalContainer;
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const ModalContainer = ({ children , isOpen , onClose }) => {

    return (
        <>
        
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    {children}
                </ModalContent>
            </Modal>
        
        </>
    )

}

export default ModalContainer;
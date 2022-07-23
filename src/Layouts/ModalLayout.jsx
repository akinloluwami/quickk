import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalLayout = ({ isOpen, onClose, children, modalHeader }) => {
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <ModalHeader>{modalHeader}</ModalHeader>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  </>;
};

export default ModalLayout;

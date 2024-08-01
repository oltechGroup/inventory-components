import { CloudArrowUp } from "phosphor-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "keep-react";

function ModalAdd({ isActive, onCloseModal }) {
  return (
    <Modal isOpen={isActive} onOpenChange={onCloseModal}>
      <ModalBody>
        <ModalContent>
          <ModalClose className="absolute right-4 top-4" />
          <ModalHeader className="mb-6 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-metal-50 dark:bg-metal-800">
              <CloudArrowUp size={28} color="#1B4DFF" />
            </div>
            <ModalTitle>Registrar Consumo</ModalTitle>
          </ModalHeader>
          <ModalFooter>
            <ModalClose asChild>
              <Button size="sm" variant="outline" color="secondary">
                Cancelar
              </Button>
            </ModalClose>
            <Button size="sm" color="primary">
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

export default ModalAdd;

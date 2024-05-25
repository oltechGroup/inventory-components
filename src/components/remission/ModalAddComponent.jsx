import { Button, Modal } from "keep-react";
import { CloudArrowUp } from "phosphor-react";

function ModalAddComponent({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Body className="space-y-3">
        <Modal.Icon>
          <CloudArrowUp size={28} color="#1B4DFF" />
        </Modal.Icon>
        <Modal.Content>
          <div className="!mb-6">
            <h3 className="mb-2 text-body-1 font-medium text-metal-900">
              Update Modal Status
            </h3>
            <p className="text-body-4 font-normal text-metal-600">
              Your document has unsaved changes. Discard or save them as a new
              page to continue.
            </p>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button
            onClick={closeModal}
            size="sm"
            variant="outline"
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={closeModal} size="sm" color="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}


export default ModalAddComponent;
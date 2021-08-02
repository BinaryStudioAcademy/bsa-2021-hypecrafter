import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import './modal.scss';

interface ModalWindowProps {
  show: boolean;
  title: string | ReactNode;
  body: string | ReactNode;
  footer?: string | ReactNode;
  type?: string;
  centered?: boolean;
  onHide(): void;
}
const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { title, show, body, footer, centered, type, onHide } = props;
  return (
    <Modal
      dialogClassName={type}
      show={show}
      onHide={onHide}
      className="my-modal"
      centered={centered}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};
export default ModalWindow;

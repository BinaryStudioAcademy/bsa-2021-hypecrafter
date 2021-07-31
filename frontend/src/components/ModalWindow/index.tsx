import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import './modal.scss';

interface ModalWindowProps {
  show: boolean;
  title: string | ReactNode;
  body: string | ReactNode;
  footer?: string | ReactNode;
  showTrigger(): void;
}
const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { title, show, body, footer, showTrigger } = props;
  return (
    <Modal show={show} onHide={showTrigger} className="my-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};
export default ModalWindow;

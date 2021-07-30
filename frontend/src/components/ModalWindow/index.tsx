/*  eslint linebreak-style: ["error", "windows"]    */
import React, { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface ModalWindowProps {
  show: boolean;
  title: string | ReactNode;
  body: string | ReactNode;
  footer: ReactNode | null;
  showTrigger(): void;
}
const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const { title, show, body, footer, showTrigger } = props;
  return (
    <Modal show={show} onHide={showTrigger}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};
export default ModalWindow;

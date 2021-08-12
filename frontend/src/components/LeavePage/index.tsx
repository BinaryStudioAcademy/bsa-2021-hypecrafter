import { FC, useState } from 'react';
import { Prompt } from 'react-router-dom';
import ModalWindow from '../ModalWindow';

interface IUseLeavePage {
  isBlocking: boolean,
  message: string
}

const LeavePage: FC<IUseLeavePage> = ({
  isBlocking = false,
  message
}) => {
  const [isShowModal, setShowModal] = useState(false);

  const handleBlockedNavigation = () => {
    if (isBlocking) {
      setShowModal(true);
      return false;
    }

    return true;
  };

  return (
    <>
      <Prompt
        when={isBlocking}
        message={handleBlockedNavigation}
      />
      <ModalWindow
        show={isShowModal}
        centered
        size="medium"
        title=""
        body={message}
        footer=" "
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default LeavePage;

import { FC, useState } from 'react';
import { Prompt } from 'react-router-dom';
import ModalWindow from '../ModalWindow';

interface IUseLeavePage {
  isBlocking?: boolean,
  message?: string
}

/**
  *  **This is an example of use.**
  *  message - This is your message when blocking.
  *            Default 'You must completely create a project.'
  *
  *  isBlocking - This is the presence of a blocking of leaving the page.
  *               Default true.
  *
  *  Basic usage example:
  *  ```typescript
  *  <LeavePage
  *    message="Your message when blocking."
  *    isBlocking={true}
  *  >
  *    <CreateProject />
  *  </LeavePage >
  *  ```
  */

const LeavePage: FC<IUseLeavePage> = ({
  isBlocking = true,
  message = 'You must completely create a project.'
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

import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '../../hooks';
import UserPage from '../../scenes/UserPage';
import ModalWindow from '../ModalWindow';

const UserModal = () => {
  const { userId } = useQuery();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleClose = () => {
    history.push(pathname);
  };

  return (
    <>
      {userId && (
        <ModalWindow
          show
          title="User Page"
          body={<UserPage userId={userId} />}
          size="extra-wide"
          centered={false}
          onHide={handleClose}
        />
      )}
    </>
  );
};

export default UserModal;

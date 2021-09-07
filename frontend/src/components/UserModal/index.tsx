import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '../../hooks';
import UserPage from '../../scenes/UserPage';
import ModalWindow from '../ModalWindow';

const UserModal = () => {
  const query = useQuery();
  const { pathname } = useLocation();
  const history = useHistory();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = query.get('userId');
    setUserId(id);
  }, [query.get('userId')]);

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

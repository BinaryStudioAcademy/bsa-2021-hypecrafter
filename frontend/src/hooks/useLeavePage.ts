import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useLeavePage = (mount: boolean) => {
  const history = useHistory();
  useEffect(() => {
    history.block(() => (mount
      ? false
      : undefined));
  });
};

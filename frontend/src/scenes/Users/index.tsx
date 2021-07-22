import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks';
import { fetchUsersAction, removeUserByIdAction } from './actions';

import classes from './styles.module.scss';

const Users = () => {
  const dispatch = useDispatch();
  const store = useTypedSelector(({ users: { items, loading } }) => ({
    users: items,
    loading
  }));
  const { users, loading } = store;

  const loadItems = () => dispatch(fetchUsersAction());
  const removeItem = (id: number) => dispatch(removeUserByIdAction(id));

  return (
    <section className={classes.container}>
      <header>
        <h1>Users</h1>
      </header>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <ul>
            {users.map(it => (
              <li key={it.id}>
                <article className={classes.item}>
                  <p>
                    <span>Name: </span>
                    <span>{it.name}</span>
                  </p>
                  <button type="button" onClick={() => removeItem(it.id)}>x</button>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button type="button" onClick={loadItems}>Load Users</button>
      </div>
    </section>
  );
};

export default Users;

import { FC } from 'react';
import { Routes } from '../../common/enums';
import { SearchResult as Search } from '../../common/types';
import Link from '../Link';
import classes from './styles.module.scss';

type Props = {
  project: Search;
  selectOption?: () => void;
};

const SearchResult: FC<Props> = ({ project, selectOption }) => (
  <div className={classes.result}>
    <Link to={`${Routes.PROJECTS}/${project.id}`} onClick={selectOption}>
      <img src={project.imageurl || 'https://dummyimage.com/600x400/000/fff.jpg&text=+'} alt={project.name} />
      <div className={classes.info}>
        <label>{project.name}</label>
        <p>{project.description}</p>
      </div>

    </Link>
  </div>
);
export default SearchResult;

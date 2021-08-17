import hypeCoin from '../../assets/HypeCoin.png';
import classes from './styles.module.scss';

interface PrivilegesProps {
  value: number;
  title: string;
  content: string;
  includes: string[];
  backers: number;
}
const maxChars = 153;

const ProjectPrivilege: React.FC<PrivilegesProps> = ({
  value,
  title,
  content,
  includes,
  backers
}) => (
  <div className={classes.wrapper}>
    <div className={classes.value_wrapper}>
      <div className={classes.value}>
        <span>{value}</span>
        <img src={hypeCoin} alt="HypeCoin" />
      </div>
      <div className={classes.or_more}>or more</div>
    </div>
    <div className={classes.title}>{title}</div>
    <div className={classes.content}>
      {content.length > maxChars ? content.slice(0, maxChars).concat('...') : content}
    </div>
    <div className={classes.includes_title}>Includes:</div>
    <ul className={classes.includes_ul}>
      {includes.map((elem, index) => (
        <li key={`${index ** 2}-privilege-include`}>{elem}</li>
      ))}
    </ul>
    <div className={classes.backers}>Backers {backers}</div>
  </div>
);

export default ProjectPrivilege;

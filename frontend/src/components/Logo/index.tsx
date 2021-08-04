import classes from './logo.module.scss';

const Logo = () => (
  <div className={`${classes.logo} ${classes.glitch}`}>
    <span aria-hidden="true">HypeCrafter</span>
    <span aria-hidden="true">HypeCrafter</span>
    <span aria-hidden="true">HypeCrafter</span>
    <span aria-hidden="true">HypeCrafter</span>
  </div>
);

export default Logo;

import classnames from 'classnames';
import classes from './styles.module.scss';
import { ColorsAvatar } from '../../common/enums';

interface Props{
    src?: string,
    userName?: string,
    width?: number,
    className?:string
}
const defaultProps: Props = {
  src: '',
  userName: '',
  width: 20,
  className: ''
};

const Avatar = (props: Props) => {
  const { src, userName, width, className } = props;
  const avatarClass = classnames(className, classes.avatar);
  const initials = userName?.split(' ').map(str => str.toUpperCase()[0]).join('').substr(0, 2);

  const getColorByName = (name = '0') => {
    const code = name.charCodeAt(0) || 0;
    const color = ColorsAvatar[code % ColorsAvatar.length];
    return color;
  };
  const background = src ? `url(${src})` : getColorByName(userName);

  return (
    <div
      style={{
        width,
        height: width,
        borderRadius: width,
        background,
        backgroundSize: 'cover'
      }}
      className={avatarClass}
    >
      {!src && <span style={{ fontSize: width ? (0.4 * width) : 10 }}>{initials || 'H'}</span>}
    </div>
  );
};

Avatar.defaultProps = defaultProps;

export default Avatar;

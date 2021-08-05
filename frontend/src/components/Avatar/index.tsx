import classnames from 'classnames';
import { ColorsAvatar } from '../../common/constans';
import { RequireAtLeastOne } from '../../common/types';
import classes from './styles.module.scss';

interface Props{
  src?: string,
  userName?: string,
  width?: number,
  className?:string
}
type SrcOrUserName = RequireAtLeastOne<Props, 'src' | 'userName'>;
const defaultProps: SrcOrUserName = {
  src: '',
  userName: '',
  width: 20,
  className: ''
};

const Avatar = (props: SrcOrUserName) => {
  const { src, userName, width, className } = props;
  const heightText = 0.4;
  const avatarClass = classnames(className, classes.avatar);
  const initials = userName?.split(' ').map(str => str.toUpperCase()[0]).join('').substr(0, 2);

  const getColorByName = (name = '0') => {
    const code = name.charCodeAt(0) || 0;
    const color = ColorsAvatar[code % ColorsAvatar.length];
    return color;
  };
  const background = src ? `url(${src})` : getColorByName(userName);
  const fontSize = width ? (heightText * width) : 10;
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
      {!src && <span style={{ fontSize }}>{initials}</span>}
    </div>
  );
};

Avatar.defaultProps = defaultProps;

export default Avatar;

import classnames from 'classnames';
import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Button as ButtonRB, ButtonProps } from 'react-bootstrap';
import classes from './styles.module.scss';

interface Props extends ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<Element>;
  type?: 'submit' | 'reset' | 'button';
  disable?: boolean;
  children?: ReactNode | string;
  outline?: boolean;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  shape?: 'rectangle' | 'circle';
  iconPosition?: 'left' | 'right';
  icon?: string | ReactNode;
  to?: string;
  id?: string;
}

const defaultProps: Props = {
  className: '',
  type: 'button',
  disable: false,
  outline: false,
  variant: 'primary',
  onClick: () => undefined,
  children: '',
  loading: false,
  shape: 'rectangle',
  iconPosition: 'left',
  icon: null,
  to: undefined,
  id: ''
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const {
    className,
    onClick,
    type,
    disable,
    children,
    outline,
    variant,
    loading,
    shape,
    iconPosition,
    icon,
    to,
    id
  } = props;

  const buttonClass = classnames(className, {
    [classes.button]: true,
    [classes[`${variant}`]]: true,
    [classes[`${variant}-outline`]]: outline,
    [classes.outline]: outline,
    [classes[`${shape}`]]: true
  });

  const buttonImgRightStyle: CSSProperties = {
    flexDirection: 'row-reverse'
  };

  return (
    <ButtonRB
      id={id}
      style={iconPosition === 'right' ? buttonImgRightStyle : {}}
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disable}
      href={to}
    >
      {loading ? <span>Loading…</span> : children}
      {icon}
    </ButtonRB>
  );
};

Button.defaultProps = defaultProps;

export default Button;

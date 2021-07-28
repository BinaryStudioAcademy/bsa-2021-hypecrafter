import { Button as ButtonRB, ButtonProps } from 'react-bootstrap';
import {
  MouseEventHandler,
  ReactNode,
  FunctionComponent,
  CSSProperties
} from 'react';
import classnames from 'classnames';
import classes from './button.module.css';

interface Props extends ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<Element>;
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  children?: ReactNode | string;
  isOutline?: boolean;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  shape?: 'rectangle' | 'circle';
  iconPosition?: 'left' | 'right';
  icon?: string | ReactNode;
  to?: string;
}

const defaultProps: Props = {
  className: '',
  type: 'button',
  isDisabled: false,
  isOutline: false,
  variant: 'primary',
  onClick: () => undefined,
  children: '',
  isLoading: false,
  shape: 'rectangle',
  iconPosition: 'left',
  icon: null,
  to: undefined
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const {
    className,
    onClick,
    type,
    isDisabled,
    children,
    isOutline,
    variant,
    isLoading,
    shape,
    iconPosition,
    icon,
    to
  } = props;

  const buttonClass = classnames(className, {
    [classes.button]: true,
    [classes[`${variant}`]]: true,
    [classes.outline]: isOutline,
    [classes[`${shape}`]]: true
  });

  const buttonImgRightStyle: CSSProperties = {
    flexDirection: 'row-reverse'
  };

  const Btn = ({ children: childrenIcon }: { children?: ReactNode }) => (
    <ButtonRB
      style={iconPosition === 'right' ? buttonImgRightStyle : {}}
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      href={to}
    >
      {isLoading ? <span>Loading…</span> : children}
      {childrenIcon}
    </ButtonRB>
  );

  Btn.defaultProps = {
    children: null
  };

  return icon ? <Btn>{icon}</Btn> : <Btn />;
};

Button.defaultProps = defaultProps;

export default Button;

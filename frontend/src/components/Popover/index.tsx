import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';
import { Overlay, Popover as PopoverRB } from 'react-bootstrap';
import classes from './styles.module.scss';

type HandleClose = () => void;

interface Props {
  placement?: 'bottom-start' | 'bottom-end' | 'bottom';
  trigger: ReactNode;
  children: (handleClose?: HandleClose) => ReactNode;
  id: string;
  rootClose?: boolean;
}

const Popover: FC<Props> = ({ placement = 'bottom', trigger, children, id, rootClose = false }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  const handleClose = () => setShow(false);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setShow(!show);
    setTarget(event.target as HTMLElement);
  };

  return (
    <div ref={ref}>
      <button onClick={handleClick} type="button" className={classes['popover-trigger']}>{trigger}</button>
      <Overlay
        show={show}
        target={target}
        placement={placement}
        container={ref.current}
        onHide={handleClose}
        rootClose={rootClose}
      >
        <PopoverRB id={id} className={classes['popover-container']}>
          <PopoverRB.Body className={classes['popover-body']}>{children(handleClose)}</PopoverRB.Body>
        </PopoverRB>
      </Overlay>
    </div>
  );
};

export default Popover;

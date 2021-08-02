import { useState, useRef, FC, ReactNode, MouseEvent } from 'react';
import { Popover as PopoverRB, Overlay } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import classes from './popover.module.scss';

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
          <PopoverRB.Body>{children(handleClose)}</PopoverRB.Body>
        </PopoverRB>
      </Overlay>
    </div>
  );
};

export default Popover;

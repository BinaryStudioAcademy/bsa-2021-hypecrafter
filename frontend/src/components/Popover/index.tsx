import { useState, useRef, FC, ReactNode, MouseEvent } from 'react';
import { Popover as PopoverRB, Overlay } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';
import './popover.scss';

type HandleClose = () => void;
type ChildFunc=(handleClose?: HandleClose) => ReactNode;

interface Props{
  placement?: Placement;
  trigger: ReactNode;
  child: ChildFunc;
}

const Popover: FC<Props> = ({ placement = 'bottom', trigger, child }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setShow(!show);
    setTarget(event.target as HTMLElement);
  };

  return (
    <div ref={ref}>
      <div className="popover-trigger">
        <button onClick={handleClick} type="button">{trigger}</button>
      </div>

      <Overlay
        show={show}
        target={target}
        placement={placement}
        container={ref.current}
        containerPadding={20}
      >
        <PopoverRB id="popover-contained">
          <PopoverRB.Body> {child(handleClose)} </PopoverRB.Body>
        </PopoverRB>
      </Overlay>
    </div>
  );
};

export default Popover;

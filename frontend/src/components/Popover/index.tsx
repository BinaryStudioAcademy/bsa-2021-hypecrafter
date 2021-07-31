import { useState, useRef, FunctionComponent, ReactNode } from 'react';
import { Popover as PopoverRB, Overlay } from 'react-bootstrap';

type HandleClose = () => void;
type HandleClickFunc=(event: any) => void; // Set correct type

type TriggerFunc=(handleClick: HandleClickFunc) => ReactNode;
type ChildFunc=(handleClose: HandleClose) => ReactNode;

interface Props{
  placement?: 'bottom' | 'top' | 'right' | 'left';
  trigger: TriggerFunc;
  child: ChildFunc;
}

const Popover: FunctionComponent<Props> = ({ placement = 'bottom', trigger, child }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleClick : HandleClickFunc = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <div className="popover-trigger">
        {trigger(handleClick)}
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

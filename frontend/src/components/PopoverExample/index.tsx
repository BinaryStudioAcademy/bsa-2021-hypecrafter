import Popover from '../Popover';

const PopoverExample = () => (
  <Popover
    trigger={(handleClick) => (
      <button onClick={handleClick} type="submit">Holy guacamole!</button>
    )}
    child={(handleClose) => (
      <button onClick={handleClose} type="submit">x</button>
    )}
    placement="top"
  />
);

export default PopoverExample;

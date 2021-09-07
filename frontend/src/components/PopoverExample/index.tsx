import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import Popover from '../Popover';

const PopoverExample = () => (
  <Popover
    trigger={
      <FontAwesomeIcon icon={faSortDown} color="white" />
    }
    placement="bottom"
    id="id"
    rootClose
  >
    {(handleClose) => (
      <div>
        <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
        <div>Someeeeeeee text</div>
      </div>
    )}
  </Popover>
);

export default PopoverExample;

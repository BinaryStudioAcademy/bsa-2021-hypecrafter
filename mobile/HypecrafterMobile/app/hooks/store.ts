import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StoreState } from '../common/types';

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
export { useDispatch } from 'react-redux';

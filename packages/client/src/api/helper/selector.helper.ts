import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootStoreType } from '../redux/store';

export const accessStore: TypedUseSelectorHook<RootStoreType> = useReduxSelector;

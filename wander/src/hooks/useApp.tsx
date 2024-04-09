import { useContext } from 'react'
import { AppContext } from '../components/provider/AppProvider';

export const useApp  = () => useContext(AppContext);
import { useContext } from 'react'
import { AppContext } from '../components/Provider/AppProvider';

export const useApp  = () => useContext(AppContext);
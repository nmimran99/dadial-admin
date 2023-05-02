import { useContext } from "react";
import ModalsContext from '../contexts/modalContext';

export default function useModals() {
	return useContext(ModalsContext);
}
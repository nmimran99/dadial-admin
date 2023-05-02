import React, { Dispatch, SetStateAction, createContext, useState } from "react";

type ModalType = {
    modalType: string | null;
    setModalType: Dispatch<SetStateAction<string | null>>
}

const ModalContext = createContext<ModalType>({} as ModalType);

export default ModalContext;

export const ModalContextProvider = ({ children }: { children: JSX.Element}) => {
	const [modalType, setModalType] = useState<string | null>(null);

	return (
		<ModalContext.Provider value={{ modalType, setModalType }}>
			{children}
		</ModalContext.Provider>
	);
};
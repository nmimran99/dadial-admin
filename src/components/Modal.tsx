import React from "react";

type IProps = {
	handleClose: () => void,
	children: JSX.Element,
	hideControls: boolean | undefined
}

const Modal = ({ handleClose, children, hideControls }: IProps) => {
	return (
		<div
			className={`fixed w-screen h-screen 
			 top-0 left-0 z-50 flex justify-center overflow-y-auto md:animate-fadeIn bg-black bg-opacity-80
			md:flex md:items-center md:justify-center
		`}
		>
			{
				!hideControls &&
				<button
					className="absolute top-4 right-4 bg-black bg-opacity-30 rounded-full p-2"
					onClick={handleClose}
				>
					<img src="/icons/close.svg" className="w-6" />
				</button>
			}
			{children}
		</div>
	);
}

export default Modal;
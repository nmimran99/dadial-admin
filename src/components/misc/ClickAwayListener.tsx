// @ts-nocheck
import  { useEffect, useRef } from "react";

export default function ClickAwayListener({
	onClickAway,
	nodeRef,
	children,
	className,
}) {
	const node = useRef<HTMLElement | undefined>();

	const handleClickAway = (e: any) => {
		if (node.current.contains(e.target)) return;
		if (nodeRef && nodeRef.current && nodeRef.current.containes(e.target))
			return;
		onClickAway();
	};

	useEffect(() => {
		window.addEventListener("click", handleClickAway, true);
		return () => {
			window.removeEventListener("click", handleClickAway, true);
		};
	}, []);

	return (
		<div ref={node} className={className}>
			{children}
		</div>
	);
}
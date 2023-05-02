import useModals from "../hooks/useModals"
import React from "react"
import CreateNewProduct from "./CreateNewProduct"
 
const Modals = () => {

    const { modalType } = useModals()

    return (
        modalType === "NewItem" ?
        <CreateNewProduct /> : <></>
    )
}

export default Modals;
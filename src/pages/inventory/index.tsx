import { GetServerSideProps } from "next"
import { IProduct } from "@/types"
import InventoryTable from "@/components/InventoryTable"

type IProps = {
    items: IProduct[]
}

const Inventory = ({ items }: IProps) => {

    return (
        <div className="">
            <InventoryTable items={items} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let res = await fetch(`${process.env.INTERNAL_URL}/api/products/listings`);
    let products = res = await res.json();
    return {
        props: {
            items: products
        }
    }
}

export default Inventory

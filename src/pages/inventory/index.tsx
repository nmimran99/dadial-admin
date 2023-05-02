import { GetServerSideProps } from "next"
import { IVariant, IncomingProduct, IncomingVariant } from "@/types"
import InventoryTable from "@/components/InventoryTable"
import useModals from "@/hooks/useModals"

type IProps = {
    items: IVariant[]
}

const Inventory = ({ items }: IProps) => {
    const { modalType } = useModals();

    return (
        <div className="">
            <InventoryTable items={items} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let res = await fetch(`${process.env.INTERNAL_URL}/api/products/listings`);
    let products = res = await res.json();
    let variants: IVariant[] = []
    products.forEach((p: IncomingProduct) => {
        if (!p.variants.length) {
            return;
        }
        p.variants.forEach((v: IncomingVariant) => {
            let variantObj: IVariant = {} as IVariant;
            variantObj.images = p.images;
            variantObj.title = p.title;
            variantObj.description = p.description;
            variantObj.tags = p.tags;
            variantObj.price = p.price
            variantObj.color = v.color;
            variantObj.size = v.size;
            variantObj.status = v.status;
            variantObj.sid = v.sid
            variants.push(variantObj);
        });
    })
    
    return {
        props: {
            items: variants
        }
    }
}

export default Inventory

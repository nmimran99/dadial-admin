import { IVariant } from "@/types"
import Image from "next/image"

type IProps = {
    items: IVariant[]
}

const headers = ["תמונות", 'מק"ט', "שם מוצר", "תיאור מוצר", "צבע", "מידה", "תגיות", "מחיר"]

const InventoryTable = ({ items }: IProps) => {
    return (
        <div className="mx-auto w-max">
            <div className="bg-blue-600 text-white h-12 flex justify-center items-center text-center rounded-lg my-2 font-bold border border-white">
                {
                    headers.map((header, i) => {
                        return (
                            <div className="w-32" key={i}>
                                {header}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    items.map((item: IVariant, i) => {
                        return (
                            <div key={i} className="text-center flex text-medium font-bold bg-white h-14 w-full text-center rounded-lg my-2 shadow-lg">
                                <div className="flex justify-center items-center h-12 w-32">
                                    <Image src={item.images[0]} width={50} height={50} alt="" />
                                </div>
                                <div className="w-32 flex items-center justify-center">
                                    {item.sid}
                                </div>
                                <div className="w-32 items-center flex justify-center">
                                    {item.title}
                                </div>
                                <div className="w-32 items-center flex justify-center">
                                    {item.description}
                                </div>
                                <div className="flex justify-center items-center h-12 w-32">
                                    <div className="w-6 h-6 rounded-full border border-2 border-gray-500 flex justify-center items-center">
                                        <div className={`w-4 h-4 rounded-full border border-1 border-gray-500`} style={{ backgroundColor: item.color }}></div>
                                    </div>

                                </div>
                                <div className="w-32 flex items-center justify-center">
                                    {item.size}
                                </div>
                                <div className="flex justify-center items-center h-12 w-32">
                                    {
                                        item.tags.map((t, i) => <div className="bg-black text-white text-sm rounded-full py-1 px-3 mx-2" key={i}>{t.text}</div>)
                                    }
                                </div>
                                <div className="w-32 flex items-center justify-center">
                                    {item.price}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default InventoryTable

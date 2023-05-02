import Image from "next/image";
import useModals from "../hooks/useModals"
import Link from "next/link";

const Navbar = () => {

    const { setModalType } = useModals();

    return (
        <div className="h-screen w-80 bg-black bg-opacity-90">
            <button  className="flex px-4 py-2 bg-blue-600 rounded-lg mx-auto mt-12 mb-2 w-3/4"
                onClick={() => setModalType("NewItem")}
            >
                <Image src={"/icons/Plus.svg"} width={28} height={28} alt="" />
                <div className="text-white text-lg px-4">
                     הוספת מוצר חדש
                </div>
            </button>
            <div className="pr-6">
                <Link href="/inventory" className="flex px-4 py-2">
                    <Image src={"/icons/TShirt.svg"} width={28} height={28} alt="" />
                    <div className="text-white text-xl px-6">
                        מלאי    
                    </div>
                </Link>
                <Link href="/orders" className="flex px-4 py-2">
                    <Image src={"/icons/Notepad.svg"} width={28} height={28} alt="" />
                    <div className="text-white text-xl px-6">
                        הזמנות    
                    </div>
                </Link>
                <Link href="/previous-sales" className="flex px-4 py-2">
                    <Image src={"/icons/ClockClockwise.svg"} width={28} height={28} alt="" />
                    <div className="text-white text-xl px-6">
                        מכירות קודמות    
                    </div>
                </Link>
            </div>
           
        </div>
    )
}

export default Navbar;
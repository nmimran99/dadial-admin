// @ts-nocheck
import React, { ChangeEvent, useRef, useState } from "react";
import Modal from "./Modal";
import useModals from "../hooks/useModals";
import useSWR from "swr";
import axios from "axios";
import ClickAwayListener from "./misc/ClickAwayListener"
import { useSession } from "next-auth/react";
import constants from "../../public/constants.json"
import { ISize, ITag } from "@/types";

type DetailsState = {
    images: any;
    title: string;
    description: string;
    tags: ITag[];
    sizes: ISize[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CreateNewProduct = () => {

    const imageInput = useRef<HTMLInputElement | undefined>();
    const { setModalType } = useModals();
    const [details, setDetails] = useState<DetailsState>({
        images: [],
        title: "",
        description: "",
        tags: [],
        sizes: [{
            size: "One Size",
            quantity: 0
        }]
    })

    const handleUploadImages = (e: ChangeEvent<HTMLInputElement>) => {
        let newFileList = Array.prototype.slice.call(e.target.files);
        setDetails({ ...details, images: [...details.images, ...newFileList] })
    }

    const removeImage = (imgObj: any) => (e: any) => {
        setDetails(d => {
            let newImages = details.images.filter((img: any) => img.name != imgObj.name);
            console.log(newImages)
            return { ...details, images: newImages }
        })
    }

    const handleChange = (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setDetails({ ...details, [field]: e.target.value })
    }

    const handleModifyTags = (tags: ITag[]) => {
        setDetails({ ...details, tags })
    }

    const handleModifySizes = (sizes) => {
        setDetails({ ...details, sizes })
    }

    return (
        <Modal hideControls handleClose={() => setModalType(null)} >
            <div className="w-3/4 2xl:w-1/2 h-3/4 bg-white rounded-xl p-8 overflow-y-auto
            ">
                <div className="text-4xl font-bold">
                    הוספת מוצר חדש
                </div>
                <div className="my-12">
                    <div className="flex flex-wrap w-full">
                        {
                            details.images.length != 0 &&
                            <>
                                {
                                    details.images.map((img: any, i: number) =>
                                        <div className="relative" key={i}>
                                            <button className="bg-black bg-opacity-70 rounded-full absolute -top-1 -right-1 p-2 z-10"
                                                onClick={removeImage(img)}
                                            >
                                                <img src={"/icons/close-white.svg"} alt="" className="w-4 h-4" />
                                            </button>
                                            <img
                                                src={URL.createObjectURL(img)}
                                                className="object-cover w-32 h-32 rounded-xl m-2 border border-2"
                                            />
                                        </div>)
                                }
                            </>
                        }
                        <button className=" border border-4 border-blue-500 w-32 h-32 m-2 rounded-xl bg-gray-100 flex flex-col justify-center items-center"
                            onClick={() => { imageInput.current && imageInput?.current.click() }}
                        >
                            <img src={"/icons/Images.svg"} className="w-12 h-12" alt="" />
                            <div className="bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center">
                                <img src="/icons/Plus.svg" className="w-5 h-5" />
                            </div>
                            <div className="font-bold my-2">
                                הוסף תמונות
                            </div>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={handleUploadImages}
                                hidden
                                multiple={true}
                                id="upload"
                                ref={imageInput}
                            />
                        </button>
                    </div>
                </div>
                <div className="flex">
                    <div className="mx-2">
                        <div className="my-2 flex">
                            <div className="border w-96 rounded-lg p-2 ">
                                <div className="text-sm font-bold flex items-center opacity-70">
                                    <img src="/icons/Keyboard.svg" className="w-5 h-5 ml-1 " />
                                    שם מוצר
                                </div>
                                <input type="text" onChange={handleChange("title")} className="outline-none w-11/12 px-2 font-bold" value={details.title} />
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="border w-96 rounded-lg p-2 ">
                                <div className="text-sm font-bold flex items-center opacity-70">
                                    <img src="/icons/TextAlignCenter.svg" className="w-5 h-5 ml-1" />
                                    תיאור מוצר</div>
                                <textarea rows={5} type="text" onChange={handleChange("description")} className="outline-none w-full px-2 font-bold" value={details.description} />
                            </div>
                        </div>
                    </div>
                    <Tags selectedTags={details.tags} handleModifyTags={handleModifyTags} />
                </div>
                <Sizes sizes={details.sizes} handleModifySizes={handleModifySizes} />
            </div>
        </Modal>
    )
}

const Sizes = ({ sizes, handleModifySizes }: { sizes: ISize[]; handleModifySize: () => void }) => {

    const tagInput = useRef();
    const [select, setSelect] = useState<string>("");

    const handleSelect = (s) => () => {
        setSelect(s)
    }

    const handleSelectSize = (prevSize, newSize) => () => {
        let newSizes = sizes.map((s) => s.size === prevSize ? { ...s, size: newSize } : s)
        handleModifySizes(newSizes);
        handleSelect(null);
    }

    const handleUpdateQuantity = (size, quantity) => () => {
        let newSizes = sizes.map((s) => s.size === size ? { ...s, quantity } : s)
        handleModifySizes(newSizes);
    }

    const handleAddSize = () => {
        handleModifySizes([...sizes, { size: getAvailableSizes()[0], quantity: 0 }]);
    }

    const handleRemoveSize = (size: string) => () => {
        let newSizes = sizes.filter((s) => s.size === size ? false : true)
        handleModifySizes(newSizes);
    }

    const getAvailableSizes = () => {
        return constants.size
            .filter(ss => !sizes.find(sz => sz.size === ss))
    }

    return (
        <div className="px-2">
            <div className="text-2xl font-bold">מידות</div>
            <div>
                {
                    sizes.map((s, i) =>
                        <div className="flex my-2" key={i}>
                            <div className="relative" key={i}>
                                <div className="border w-40 rounded-lg p-2 " ref={tagInput}>
                                    <div className="text-sm font-bold flex items-center opacity-70">
                                        <img src="/icons/Ruler.svg" className="w-5 h-5 ml-1" />
                                        מידה
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="px-2 font-bold text-sm px-2 py-0.5">
                                            {s.size}
                                        </div>
                                        <button onClick={handleSelect(s.size)} >
                                            <img src="/icons/CaretDown.svg" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {
                                    select === s.size &&
                                    <ClickAwayListener onClickAway={handleSelect(null)}>
                                        <div className="w-40 max-h-52 border rounded-lg absolute top-16 z-10 bg-white overflow-y-auto">
                                            {
                                                getAvailableSizes()
                                                    .map((sz, idx) =>
                                                        <button key={idx} className="px-4 py-2 font-bold w-full hover:bg-gray-200 cursor-pointer text-right text-sm"
                                                            onClick={handleSelectSize(s.size, sz)}
                                                        >
                                                            {sz}
                                                        </button>)
                                            }
                                        </div>
                                    </ClickAwayListener>
                                }
                            </div>
                            <div className="border w-40 rounded-lg p-2 mx-2" ref={tagInput}>
                                <div className="text-sm font-bold flex items-center opacity-70">
                                    <img src="/icons/CirclesThree.svg" className="w-5 h-5 ml-1" />
                                    כמות
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="px-2 font-bold text-sm px-2 py-0.5">
                                        {s.quantity}
                                    </div>
                                    <div className="flex">
                                        <button onClick={handleUpdateQuantity(s.size, s.quantity - 1)}
                                            disabled={s.quantity === 0}
                                            className="disabled:opacity-50"
                                        >
                                            <img src="/icons/MinusCircle.svg" className="w-6 h-6" />
                                        </button>
                                        <button onClick={handleUpdateQuantity(s.size, s.quantity + 1)}>
                                            <img src="/icons/PlusCircle.svg" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="rounded-full w-max h-max p-1 flex justify-between items-center text-white text-sm my-auto border border-red-500 border-2 mx-4"
                            onClick={handleRemoveSize(s.size)}
                            >
                                <img src="/icons/RedTrash.svg" className="w-6 h-6" />
                            </button>
                        </div>
                    )
                }
            </div>
            <button className="bg-blue-500 rounded-full py-1 flex text-white font-bold items-center pr-2 pl-4"
                onClick={handleAddSize}
            >
                <img src="/icons/Plus.svg" className="w-5 h-5 ml-1" />
                הוספה
            </button>
        </div>
    )
}

const Tags = ({ selectedTags, handleModifyTags }: { selectedTags: ITag[], handleModifyTags: () => void }) => {
    const session = useSession();
    const { data: tags, error } = useSWR(`/api/products/tags`, fetcher);
    const [tagSearch, setTagSearch] = useState("");
    const [select, setSelect] = useState(false);

    const handleChange = (e) => {
        setTagSearch(e.target.value);
        setSelect(true);
    }

    const handleSelect = () => {
        setSelect(!select)
    }

    const handleAddTag = (tag) => (e) => {
        let exists = selectedTags.find(t => t._id == tag._id);
        if (!exists) {
            handleModifyTags([...selectedTags, tag])
        }
        setSelect(false)
        setTagSearch("")
    }

    const handleRemoveTag = (tag) => (e) => {
        let newTags = selectedTags.filter((t) => t._id != tag._id);
        handleModifyTags(newTags)
    }

    const handleCreateTag = async () => {
        let result = await fetch(`/api/products/tags`, {
            method: "POST",
            body: JSON.stringify({ text: tagSearch, token: session.data.user.token }),
        })
        result = await result.json();
        handleModifyTags([...selectedTags, result])
        setSelect(false)
        setTagSearch("");
    }

    return (
        <div className="mx-2">
            <div className="my-2 flex flex-col align-items relative">
                <div className="border w-96 rounded-lg p-2">
                    <div className="text-sm font-bold flex items-center opacity-70">
                        <img src="/icons/Tag.svg" className="w-5 h-5 ml-1" />
                        תגיות
                    </div>
                    <input type="text" onChange={handleChange} className="outline-none w-11/12 px-2 font-bold" value={tagSearch} />
                    <button onClick={handleSelect}>
                        <img src="/icons/CaretDown.svg" className="w-4 h-4" />
                    </button>
                </div>
                {
                    selectedTags.length > 0 &&
                    <div className="flex flex-wrap my-1 w-11/12">
                        {
                            selectedTags.map((t, i) =>
                                <div className="bg-black bg-opacity-80 w-max rounded-full pr-4 py-1 text-white mx-0.5 my-1 flex items-center" key={i}>
                                    {t.text}
                                    <button className="border border-2 rounded-full p-1 ml-1 mr-3"
                                        onClick={handleRemoveTag(t)}
                                    >
                                        <img src="/icons/close-white.svg" className="w-4 h-4" />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                }
                {
                    select &&
                    <ClickAwayListener onClickAway={handleSelect} >
                        <div className="w-96 max-h-52 border my-1 rounded-lg absolute top-15 z-10 bg-white overflow-y-auto">
                            {
                                tags
                                    .filter((t) => {
                                        return tagSearch ? t.text.indexOf(tagSearch) != -1 : t
                                    })
                                    .map((t, i) =>
                                        <button key={i} className="px-4 py-2 font-bold w-full hover:bg-gray-200 cursor-pointer text-right"
                                            onClick={handleAddTag(t)}
                                        >
                                            {t.text}
                                        </button>)
                            }
                            {tagSearch != "" && !tags.find(t => t.text == tagSearch) &&
                                <div className="px-4 py-2 font-bold w-full hover:bg-gray-200 cursor-pointer text-right flex justify-between align-center">
                                    {tagSearch}
                                    <button className="flex bg-black rounded-full text-white text-xs my-auto py-0.5 px-2"
                                        onClick={handleCreateTag}
                                    >
                                        שמור תגית
                                    </button>
                                </div>
                            }

                        </div>
                    </ClickAwayListener>
                }
            </div>
        </div>
    )
}

export default CreateNewProduct;
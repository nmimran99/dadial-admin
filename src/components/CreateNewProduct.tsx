// @ts-nocheck
import React, { ChangeEvent, useRef, useState } from "react";
import Modal from "./Modal";
import useModals from "../hooks/useModals";
import useSWR from "swr";
import axios from "axios";
import ClickAwayListener from "./misc/ClickAwayListener"
import { useSession } from "next-auth/react";
import constants from "../../public/constants.json"

type DetailsState = {
    images: any;
    title: string;
    description: string;
    tags: string[];
    variants: [];
}

type VariantsState = {
    id: 0;
    size: string;
    color: string;
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
        variants: []
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

    const handleModifyTags = (tags: string[]) => {
        setDetails({ ...details, tags })
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
                                <div className="text-sm font-bold">שם מוצר</div>
                                <input type="text" onChange={handleChange("title")} className="outline-none w-11/12" value={details.title} />
                            </div>
                        </div>
                        <div className="my-4">
                            <div className="border w-96 rounded-lg p-2 ">
                                <div className="text-sm font-bold">תיאור מוצר</div>
                                <textarea rows={5} type="text" onChange={handleChange("description")} className="outline-none w-full" value={details.description} />
                            </div>
                        </div>
                    </div>
                    <Tags selectedTags={details.tags} handleModifyTags={handleModifyTags} />
                </div>
                <Variants />
            </div>
        </Modal>
    )
}

const Variants = () => {
    const [variants, setVariants] = useState<VariantsState[]>([{
        id: 0,
        size: "one-Size",
        color: "#FF0000"
    }]);

    const [select, setSelect] = useState<string | null | number[]>(["", null]);

    const handleSelect = (type: string | null | number[]) => (e) => {
        setSelect(type);
    }

    const handleChangeColor = (variantId, color) => (e) => {
        setVariants(vars => vars.map(v => v.id === variantId ? { ...v, color } : v))
        setSelect(["", null]);
    }

    const handleChangeSize = (variantId, size) => (e) => {
        setVariants(vars => vars.map(v => v.id === variantId ? { ...v, size } : v))
        setSelect(["", null]);
    }

    const handleAddVariant = () => {
        setVariants([...variants, {
            id: variants.length,
            size: "",
            color: ""
        }])
    }

    return <div className="my-4">
        <div className="text-2xl font-bold px-4">
            צבעים ומידות
        </div>
        <div>
            {
                variants.map((variant, i) =>
                    <div className="flex">
                        <div className="m-2 relative">
                            <div className="border w-48 rounded-lg p-2">
                                <div className="text-sm font-bold">צבע</div>
                                <div className="flex justify-between items-center h-7">
                                    <div className="flex justify-center items-center pr-1">
                                        {
                                            variant.color &&
                                            <>
                                                <div className="flex border border-2 border-gray-400 rounded-full p-0.5">
                                                    <div style={{ backgroundColor: variant.color }} className="w-3 h-3 rounded-full "></div>
                                                </div>
                                                <div className="px-1 font-bold">{constants.colors.find(c => c.hex === variant.color)?.name}</div>
                                            </>
                                        }
                                    </div>
                                    <button onClick={handleSelect(["color", variant.id])}>
                                        <img src="/icons/CaretDown.svg" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            {
                                select[0] === "color" && select[1] === variant.id &&
                                <ClickAwayListener onClickAway={handleSelect(["", null])} >
                                    <div className="border rounded-xl w-48 mt-2 absolute z-10 bg-white h-52 overflow-y-auto py-2">
                                        {
                                            constants.colors.map((c, i) => <button className="flex items-center px-2 h-9 w-full hover:bg-gray-200 "
                                                onClick={handleChangeColor(variant.id, c.hex)}
                                                key={i}
                                            >
                                                <div className="flex border border-2 border-gray-400 rounded-full p-0.5 ">
                                                    <div style={{ backgroundColor: c.hex }} className="w-3 h-3 rounded-full"></div>
                                                </div>
                                                <div className="px-1 font-bold">{c.name}</div>
                                            </button>)
                                        }
                                    </div>
                                </ClickAwayListener>
                            }
                        </div>
                        <div className="m-2 relative">
                            <div className="border w-48 rounded-lg p-2">
                                <div className="text-sm font-bold">מידה</div>
                                <div className="flex justify-between items-center h-7">
                                    <div className="flex justify-center items-center pr-1">
                                        <div className="px-1 font-bold">{variant.size}</div>
                                    </div>
                                    <button onClick={["size", variant.id]}>
                                        <img src="/icons/CaretDown.svg" className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            {
                                select[0] === "size" && select[1] === variant.id &&
                                <ClickAwayListener onClickAway={handleSelect(["", null])} >
                                    <div className="border rounded-xl w-48 mt-2 absolute z-10 bg-white h-52 overflow-y-auto py-2">
                                        {
                                            constants.size.map((s, i) => <button className="flex items-center px-2 h-9 w-full hover:bg-gray-200 "
                                                onClick={handleChangeSize(variant.id, s)}
                                                key={i}
                                            >
                                                <div className="px-1 font-bold">{s}</div>
                                            </button>)
                                        }
                                    </div>
                                </ClickAwayListener>
                            }
                        </div>
                    </div>
                )
            }
            <button className="bg-blue-500 flex text-white font-bold text-lg justify-center items-center rounded-full py-1 pl-4"
                onClick={handleAddVariant}
            >
                <img src="icons/Plus.svg" className="w-6 h-6 mx-2" alt="" />
                הוספה
            </button>
        </div>
    </div>
}

const Tags = ({ selectedTags, handleModifyTags }: { selectedTags: ITag[], handleModifyTags: () => void }) => {
    const session = useSession();
    const { data: tags, error } = useSWR(`/api/products/tags`, fetcher);
    const [tagSearch, setTagSearch] = useState("");
    const [select, setSelect] = useState(false);
    const tagInput = useRef();

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
                <div className="border w-96 rounded-lg p-2" ref={tagInput}>
                    <div className="text-sm font-bold">תגיות</div>
                    <input type="text" onChange={handleChange} className="outline-none w-11/12" value={tagSearch} />
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
                        <div className="w-96 max-h-52 border my-1 rounded-lg absolute top-16 z-10 bg-white overflow-y-auto">
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
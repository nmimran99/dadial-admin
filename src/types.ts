
export interface IncomingProduct {
    _id: string;
    title: string;
    description: string;
    images: string[],
    variants: IncomingVariant[]
    price: number;
    tags: IncomingTag[],
    isArchived: false,
    createdAt: Date,
    updatedAt: Date,
}

export interface IVariant {
    sid: number;
    images: string[];
    title: string;
    description: string;
    price: number;
    archived: boolean;
    tags: ITag[];
    color: string;
    size: string;
    status: string;
}

export interface IncomingVariant {
    _id: string;
    sid: number;
    productId: string;
    color: string;
    size: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IncomingTag {
    _id: string;
    text: string;
    __v: number;
}

export interface ITag {
    _id: string;
    text: string;
}
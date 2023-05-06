
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

export interface IProduct {
    sid: number;
    images: string[];
    title: string;
    description: string;
    price: number;
    archived: boolean;
    tags: ITag[];
    sizes: ISize[];
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

export interface OutboundProduct {
    title: string;
    description: string;
    images: any[];
    tags: string[];
    sizes: ISize[];
}

export interface ITag {
    _id: string;
    text: string;
}

export interface ISize {
    _id? : string;
    size: string;
    quantity: number;
}
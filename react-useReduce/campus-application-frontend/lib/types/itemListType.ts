export interface ItemsList {
    list: ItemType[];
}

export type ItemType = {
    name: string;
    description: string;
    cover: string;
    url: string;
}
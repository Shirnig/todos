export interface HeaderState {
    displayAddModal: boolean
}

export interface AddNoteState {
    title: string,
    current_item: string,
    items: Array<Object>,
    create_date: Date,
    update_date: Date,
    error: string
}

export interface newNote {
    title: string;
    create_date: Date;
    update_date: Date;
    items: Item;
}

export interface Note {
    id: number;
    title: string;
    create_date: Date;
    update_date: Date;
    items: Item;
}

export interface Item {
    map(arg0: (item: Item, idx: number) => JSX.Element): import("react").ReactNode;
    content: string;
    checked: boolean;
}



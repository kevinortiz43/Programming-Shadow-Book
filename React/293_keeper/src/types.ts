
export interface NoteObj {
    key: number;
    title: string;
    content: string;
}

export type NotesType = NoteObj[];

export type NotesElsType = JSX.Element[]; // What CreateNotes would return type as arr of JSX.Element
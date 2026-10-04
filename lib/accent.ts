export const ACCENTS = ["ambar", "rosa"] as const;
export type Accent = (typeof ACCENTS)[number];

export const isAccent = (v?:string): v is Accent => 
    ACCENTS.includes(v as Accent);
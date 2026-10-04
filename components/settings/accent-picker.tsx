"use client"

import { useState } from "react";
import { ACCENTS, type Accent } from "@/lib/accent";
import { cn } from "@/lib/utils";

const SWATCH: Record<Accent, { label:string, color:string}> ={
    ambar: {label: "Ámbar", color: "#E8A33D"},
    rosa: {label:"Rosa", color:"#F28CAB"}
};

function applyAccent(a: Accent){
    document.documentElement.dataset.accent = a;
    document.cookie = `accent=${a}; path=/; max-age=31536000; samesite=lax`;
}

export function AccentPicker({ initial }: {initial: Accent}){
    const [accent, setAccent] = useState<Accent>(initial);

    const select = (a: Accent) =>{
        applyAccent(a);
        setAccent(a);
    };

    return (
            <div role="radiogroup" aria-label="Color de acento" className="flex gap-3">
                {ACCENTS.map((a)=>(
                    <button
                        key={a}
                        role="radio"
                        aria-checked={accent === a}
                        onClick={()=>select(a)}
                        className={cn(
                            "flex items-center gap-2 rounded-lg border px-4 h-11",
                            accent === a && "ring-2 ring-ring"
                        )}
                    >
                        <span className="size-5 rounded-full" style={{background:SWATCH[a].color}}/>
                        {SWATCH[a].label}
                    </button>
                ))
                }
            </div>
    )
}
import { Enumeration, Str, Obj } from "chanfana";
import type { Context } from "hono";

export type AppContext = Context<{ Bindings: Env }>;

export const SkinFile = Obj({
    name: Str(),
    css: Str(),
    media: Str(),
    importance: Enumeration({
        values: [
            "optional",
            "recommended",
            "required"
        ]
    })
});

export const Variable = Obj({
   type: Str(),
   name: Str(),
   default: Str(),
   description: Str()
});

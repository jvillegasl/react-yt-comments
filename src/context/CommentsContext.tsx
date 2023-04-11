import { useComments } from "@/hooks";
import { createContext } from "react";

type CommentsContext = ReturnType<typeof useComments>;

export const CommentsContext = createContext<CommentsContext | null>(null);

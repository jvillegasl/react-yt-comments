import { User } from "@/types";
import { createContext } from "react";

type UserContext = User;

export const UserContext = createContext<UserContext | null>(null);

'use client';

import { createContext, Dispatch, SetStateAction } from "react";

type TContext = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<TContext | undefined>(undefined);

export default AuthContext;
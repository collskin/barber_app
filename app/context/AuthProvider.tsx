//app/theme-provider.tsx
"use client";
import { useState } from "react";
import AuthContext from "./AuthContext";

export default function ThemeProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [token, setToken] = useState('');

    return (
        <>
            {/* // @ts-ignore */}
            <AuthContext.Provider value={{ token, setToken }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext(null);

export function TokenProvider({ children }) {
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const response = await fetch("/api/auth", {
                    method: "POST",
                });
                if (!response.ok) throw new Error("Ошибка получения токена");

                const data = await response.json();
                setToken(data.token || "");
            } catch (error) {
                console.error("Ошибка сети:", error);
            }
        };

        fetchToken();
    }, []);

    return (
        <TokenContext.Provider value={{ token }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    return useContext(TokenContext);
}

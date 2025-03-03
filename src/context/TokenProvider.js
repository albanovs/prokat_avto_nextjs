"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext(null);

export function TokenProvider({ children }) {
    const [token, setToken] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
            } else {
                getToken();
            }
        }
    }, []);

    const getToken = async () => {
        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "UserName": "USER_FOR_SITE",
                    "PasswordHash": "0b306588b37bffb84eb940c90aba6a3c5f73c3deec7166ad0dcc09c994b036bcc8d76e2cb939b44dcd740f1937b3cb95fb91bf02f886a423be659",
                    "LongToken": true
                })
            });

            if (!response.ok) throw new Error(`Ошибка запроса: ${response.status}`);

            const data = await response.json();
            if (data?.AccessToken) {
                setToken(data.AccessToken);
                if (typeof window !== "undefined") {
                    localStorage.setItem("token", data.AccessToken);
                }
            } else {
                console.error("Ошибка получения токена", data.error);
            }
        } catch (error) {
            console.error("Ошибка сети или сервера:", error);
        }
    };

    return (
        <TokenContext.Provider value={{ token, getToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    return useContext(TokenContext);
}
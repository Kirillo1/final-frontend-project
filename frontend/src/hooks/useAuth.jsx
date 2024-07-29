import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem("user");

        if (userFromLocalStorage) {
            setUser(JSON.parse(userFromLocalStorage));
        }
    }, []);

    const onLogin = async (userData) => {
        try {
            const { login, password } = userData;

            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    username: login,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.access_token;

                const userResponse = await fetch('http://localhost:8080/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    localStorage.setItem('user', JSON.stringify(userData));
                    localStorage.setItem('token', token)
                    setUser(userData);
                } else {
                    console.error("Failed to fetch user data:", userResponse.statusText);
                }
            } else {
                console.error("Login failed:", await response.text());
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const onLogout = async () => {
        try {
            console.log(localStorage.getItem('token'))
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                localStorage.removeItem("user");
                setUser(null);
            } else {
                console.error("Logout failed:", await response.text());
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const contextValue = { user, onLogin, onLogout };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

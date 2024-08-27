import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserFromLocalStorage = () => {
            const userFromLocalStorage = localStorage.getItem("user");
            if (userFromLocalStorage) {
                setUser(JSON.parse(userFromLocalStorage));
            }
            setLoading(false);
        };

        fetchUserFromLocalStorage();
    }, []);

    const onRegister = async (userRegistrationData) => {
        setLoading(true);
        setError(null);

        try {
            const {
                login,
                password,
                first_name,
                last_name,
                phone_number,
                company_name
            } = userRegistrationData;

            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'password',
                    email: login,
                    password: password,
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone_number,
                    company_name: company_name,
                    is_active: true,
                    is_superuser: false,
                    is_verified: true,
                    role: "company"
                }),
            });

            if (response.ok) {
                await onLogin({
                    login: userRegistrationData.login,
                    password: userRegistrationData.password,
                });
            } else {
                const errorText = await response.text();
                console.error("Registration failed:", errorText);
                setError(errorText);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onLogin = async (userData) => {
        setLoading(true);
        setError(null);

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
                    localStorage.setItem('token', token);
                    setUser(userData);
                } else {
                    console.error("Failed to fetch user data:", userResponse.statusText);
                    setError(userResponse.statusText);
                }
            } else {
                const errorText = await response.text();
                console.error("Login failed:", errorText);
                setError(errorText);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onLogout = async () => {
        setLoading(true);
        setError(null);

        try {
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
                const errorText = await response.text();
                console.error("Logout failed:", errorText);
                setError(errorText);
                localStorage.removeItem("user");
                setUser(null);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = { user, loading, error, onRegister, onLogin, onLogout };

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

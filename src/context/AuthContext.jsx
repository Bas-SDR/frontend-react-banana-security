import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState(false);
    const navigate = useNavigate();

    function login() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!")
        navigate("/");
    }

    const data = {
        isAuth: isAuth,
        login: login,
        logout: logout,
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
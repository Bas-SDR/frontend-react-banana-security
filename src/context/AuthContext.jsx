import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const navigate = useNavigate();

    useEffect(() => {
            const token = localStorage.getItem("token");

            if (token) {
                const decodedToken = jwtDecode(token);
                if (isTokenValid(decodedToken)) {
                    toggleAuth({
                        isAuth: true,
                        user: {
                            email: decodedToken.email,
                            roles: decodedToken.role,
                        },
                        status: "done",
                    });
                } else {
                    logout();
                }
            } else {
                toggleAuth({
                    ...auth,
                    status: "done",
                })
            }
        }
        , []);

    function login(userDetails) {
        localStorage.setItem("token", userDetails.token)
        toggleAuth({
            isAuth: true,
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles
            },
            status: "done",
        });
        console.log("Gebruiker is ingelogd!");
        navigate("/profile");
    }

    function logout() {
        toggleAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        console.log("Gebruiker is uitgelogd!");
        localStorage.removeItem("token");
        navigate("/");
    }

    const data = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
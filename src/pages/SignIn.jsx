import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import isTokenValid from "../helpers/isTokenValid";


function SignIn() {
    const {login} = useContext(AuthContext)
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token && isTokenValid(token)) {
            navigate("/profile");
        }
    },[])


    async function handleSubmit(e) {
        e.preventDefault();
        const controller = new AbortController();
        setError(false);
        try {
            const result = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login", {
                email: emailValue,
                password: passwordValue,
                signal: controller.signal,
            }, {
                headers: {
                    "novi-education-project-id": "63fbd185-da3e-4faa-8b0f-1e1ba8957989",
                }
            });
            login(result.data);
            // console.log(result.data);

            return function cleanup() {
                controller.abort();
            }
        } catch (e) {
            console.error(e);
            setError(true)
        }
    }

    return (
                <>
                    <h1>Inloggen</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga
                        id molestias qui quo unde?</p>

                    <form>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        {error && <p>E-mail + wachtwoord combinatie is incorrect!</p>}
                        <button onClick={handleSubmit}>Inloggen</button>
                    </form>

                    <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
                </>);
}

    export default SignIn;
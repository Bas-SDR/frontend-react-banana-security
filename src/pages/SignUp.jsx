import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);
    const [name, setName] = useState("")


    async function handleSubmit(e) {
        e.preventDefault();
        const controller = new AbortController;
        setError(false);
        try {
            const result = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/users", {
                "email": emailValue,
                "password": passwordValue,
                "roles": ["anonymous", "user"],
                signal: controller.signal,
            }, {
                headers: {
                    "novi-education-project-id": "63fbd185-da3e-4faa-8b0f-1e1ba8957989"
                }
            });
            // console.log(result.data);
            setName(result.data.email);
            setAccountCreated(true);
            return function cleanup() {
                controller.abort();
            }

        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
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
                <button
                    type="button"
                    onClick={handleSubmit}>Registreer!
                </button>
                {error && <p>Er is een fout opgetreden tijdens het creëren van je account.</p>}
                {accountCreated && <p>Welkom {name}, je account is succesvol aangemaakt!</p>}
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
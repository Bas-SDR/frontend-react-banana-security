import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const {login} = useContext(AuthContext)


    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const result = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/login", {
                email: "regular.user@example.com",
                password: "regular123",
            }, {
                headers: {
                "novi-education-project-id": "63fbd185-da3e-4faa-8b0f-1e1ba8957989",
                }
            });
            login(result.data);
            // console.log(result.data);
        } catch(e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email"/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password"/>
            <button onClick={handleSubmit}>Inloggen</button>
        </form>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;
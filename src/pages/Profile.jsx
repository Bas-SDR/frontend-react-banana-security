import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const {user} = useContext(AuthContext);
    const [secrets, setSecrets] = useState({});

    useEffect(() => {
            async function secretMessage() {
                const token = localStorage.getItem("token");
                try {
                    const result = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/secrets",
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    // console.log(result.data);
                    setSecrets(result.data);
                } catch (e) {
                    console.error(e);
                }
            }

            secretMessage();
        }
        , []);


    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username === undefined ? user.email : user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                {Object.keys(secrets).length > 0 &&
                    secrets.map((secret) => {
                        return (
                            <article key={secret.id}>
                                <h3>{secret.title}</h3>
                                <p>{secret.content}</p>
                            </article>
                        )
                    })
                }
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
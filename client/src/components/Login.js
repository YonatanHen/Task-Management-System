import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsersList, socket }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        /** Handles socket interactions with the server */
        socket.connect();

        socket.on('usersList', (users) => {
            setUsersList(users);
        });

        return () => {
            socket.disconnect();
            socket.off('usersList');
        };
    }, []);

    const handleLogin = () => {
        /** handles a login of user */
        if (username.trim() !== '') {
            socket.emit('login', username);

            setUsername('');

            navigate(`/projects/`);
        } else {
            alert("Please enter your name");
        }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "center", alignItems: "center" }}>
            <div style={{ gridColumn: "2 / 3", textAlign: "center" }}>
                <h3>Task Manager App</h3>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
                    <input
                        placeholder="Enter your name"
                        style={{ fontSize: 18, paddingLeft: 4, marginRight: 10 }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsersList, socket }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
        if (username.trim() !== '') {
            socket.emit('login', username);

            setUsername('');

            navigate(`/projects/`);
        } else {
            alert("Please enter your name")
        }
    };

    return (
        <div style={{ flexDirection: "column", justifyContent: 'center', alignContent: 'center', marginLeft: "30%" }}>
            <h3>Task Manager App</h3>
            <div style={{ display: "flex", marginTop: "5%" }}>
                <input
                    placeholder="Enter your name"
                    style={{ fontSize: 18, paddingLeft: 4 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;

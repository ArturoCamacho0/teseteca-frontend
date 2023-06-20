import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            return <Navigate to="/login" />;
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page.</p>
        </div>
    );
}

export default Home;
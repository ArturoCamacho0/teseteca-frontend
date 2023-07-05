import React from "react";
import { Content, Heading, Button } from "@carbon/react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Content className="not-found-content">
            <div className="not-found-container">
                <Heading>Error 404</Heading>
                <p>¡Oops! La página que estás buscando no existe.</p>
                <Button onClick={handleGoHome} kind="primary">
                    Volver a la página de inicio
                </Button>
            </div>
        </Content>
    );
};

export default NotFoundPage;

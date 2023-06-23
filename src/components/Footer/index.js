import React from "react";
import "./index.css";

const AppFooter = () => {
    return (
        <div className="app-footer">
            <div className="footer-links">
                <a href="#">Acerca de</a>
                <a href="#">Términos de servicio</a>
                <a href="#">Política de privacidad</a>
            </div>
            <p>© {new Date().getFullYear()} Arturo Camacho Hernandez. Maria Michelle Gonzales Tovar.</p>
        </div>
    );
};

export default AppFooter;

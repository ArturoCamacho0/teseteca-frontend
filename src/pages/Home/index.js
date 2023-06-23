import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Content,
    ClickableTile
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";
import './index.css';

const Home = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is not logged in, redirect to the login page
        if (!token || !user) {
            navigate("/login");
        }
    }, [token, user, navigate]);

    return (
        <Content className="home-content">
            <h1>Bienvenid@ {user ? user.name : ''}</h1>
            <h4>Aqu&iacute; tienes el resumen a d&iacute;a de hoy:</h4>
            <div className="stat-cards-container">
                <ClickableTile className="stat-card" href="#">
                    <div className="stat-card-content">
                        <h2>Total de Usuarios</h2>
                        <p className="stat-value">1,234</p>
                    </div>
                    <div className="stat-card-footer">
                        <div className="stat-card-footer-content">
                            <p>Ver Detalles</p>
                            <ArrowRight />
                        </div>
                    </div>
                </ClickableTile>
                <ClickableTile className="stat-card" href="/projects">
                    <div className="stat-card-content">
                        <h2>Proyectos Activos</h2>
                        <p className="stat-value">567</p>
                    </div>
                    <div className="stat-card-footer">
                        <div className="stat-card-footer-content">
                            <p>Ver Detalles</p>
                            <ArrowRight />
                        </div>
                    </div>
                </ClickableTile>
                <ClickableTile className="stat-card" href="/projects">
                    <div className="stat-card-content">
                        <h2>Proyectos concluidos</h2>
                        <p className="stat-value">567</p>
                    </div>
                    <div className="stat-card-footer">
                        <div className="stat-card-footer-content">
                            <p>Ver Detalles</p>
                            <ArrowRight />
                        </div>
                    </div>
                </ClickableTile>
                <ClickableTile className="stat-card" href="#">
                    <div className="stat-card-content">
                        <h2>Tareas Pendientes</h2>
                        <p className="stat-value">89</p>
                    </div>
                    <div className="stat-card-footer">
                        <div className="stat-card-footer-content">
                            <p>Ver Detalles</p>
                            <ArrowRight />
                        </div>
                    </div>
                </ClickableTile>
            </div>
        </Content>
    );
};


export default Home;
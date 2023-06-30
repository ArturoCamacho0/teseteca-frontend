import React, { useEffect, useState } from "react";
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

    const [activeProjectsCount, setActiveProjectsCount] = useState(0);
    const [inactiveProjectsCount, setInactiveProjectsCount] = useState(0);
    const [customersCount, setCustomersCount] = useState(0);

    useEffect(() => {
        // If the user is not logged in, redirect to the login page
        if (!token || !user) {
            navigate("/login");
        } else {
            fetchActiveProjectsCount();
            fetchInactiveProjectsCount();
            fetchUsersCount();
        }
    }, [token, user, navigate]);

    const fetchActiveProjectsCount = () => {
        fetch("https://tesegewalt.website/api/projects/active/amount", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setActiveProjectsCount(data.count);
            })
            .catch(error => {
                console.log("Error fetching active projects count:", error);
            });
    };

    const fetchInactiveProjectsCount = () => {
        fetch("https://tesegewalt.website/api/projects/inactive/amount", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setInactiveProjectsCount(data.count);
            })
            .catch(error => {
                console.log("Error fetching inactive projects count:", error);
            });
    };

    const fetchUsersCount = () => {
        fetch("https://tesegewalt.website/api/clients", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCustomersCount(data.length);
            })
            .catch(error => {
                console.log("Error fetching customers count:", error);
            });
    };

    return (
        <Content className="home-content">
            <h1>Bienvenid@ {user ? user.name : ''}</h1>
            <h4>Aquí tienes el resumen a día de hoy:</h4>
            <div className="stat-cards-container">
                <ClickableTile className="stat-card" href="/customers">
                    <div className="stat-card-content">
                        <h2>Total de Clientes</h2>
                        <p className="stat-value">{customersCount}</p>
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
                        <p className="stat-value">{activeProjectsCount}</p>
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
                        <p className="stat-value">{inactiveProjectsCount}</p>
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

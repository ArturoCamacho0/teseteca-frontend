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
    const [customersCount, setCustomersCount] = useState(0);
    const [countTasks, setCountTasks] = useState(0);
    const [endingProjects, setEndingProjects] = useState([]);

    useEffect(() => {
        // If the user is not logged in, redirect to the login page
        if (!token || !user) {
            navigate("/login");
        } else {
            fetchActiveProjectsCount();
            fetchPendingTasksCount();
            fetchUsersCount();
            fetchEndingProjects();
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

    const fetchPendingTasksCount = () => {
        fetch("https://tesegewalt.website/api/tasks/pending/count", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCountTasks(data.pending_tasks);
            })
            .catch(error => {
                console.log("Error fetching tasks count:", error);
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
                setCustomersCount(data.total);
            })
            .catch(error => {
                console.log("Error fetching customers count:", error);
            });
    };

    const fetchEndingProjects = () => {
        fetch("https://tesegewalt.website/api/upcoming/projects", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setEndingProjects(data);
            })
            .catch(error => {
                console.log("Error fetching ending projects:", error);
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
                            <p>Ver Detalles</p></div>
                    </div>
                </ClickableTile>
                <ClickableTile className="stat-card" href="/projects">
                    <div className="stat-card-content">
                        <h2>Proyectos activos</h2>
                        <p className="stat-value">{activeProjectsCount}</p>
                    </div>
                    <div className="stat-card-footer">
                        <div className="stat-card-footer-content">
                            <p>Ver Detalles</p>
                            <ArrowRight />
                        </div>
                    </div>
                </ClickableTile>
                <ClickableTile className="stat-card" id="task-container">
                    <div className="stat-card-content">
                        <h2>Tareas pendientes</h2>
                        <p className="stat-value">{countTasks}</p>
                    </div>
                </ClickableTile>
            </div>

            <br /><br /><br />
            <h4>Proyectos próximos a sobrepasar la fecha l&iacute;mite:</h4>
            {endingProjects.length === 0 && <p>No hay proyectos pr&oacute;ximos a sobrepasar la fecha l&iacute;mite.</p>}
            <ul>
                {endingProjects.map(project => (
                    <li key={project.project_id}>
                        <ClickableTile className="ending-project" href={`/projects/${project.project_id}`}>
                            <h5>{project.name}</h5>
                            <p>Fecha de l&iacute;mite: {project.end_date}</p>
                        </ClickableTile>
                    </li>
                ))}
            </ul>
        </Content>
    );
};

export default Home;

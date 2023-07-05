import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Content,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Button,
    Modal,
    TextInput,
    Form,
    Pagination,
    Link,
    SkeletonText,
    ExpandableSearch,
    DatePicker,
    DatePickerInput,
    Select,
    SelectItem,
} from "@carbon/react";
import { Edit, TrashCan, Add } from "@carbon/icons-react";
import axios from "axios";
import Notification from '../../components/Notification';
import "./index.css";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [editProjectName, setEditProjectName] = useState("");
    const [editProjectDescription, setEditProjectDescription] = useState("");
    const [editProjectStartDate, setEditProjectStartDate] = useState("");
    const [editProjectEndDate, setEditProjectEndDate] = useState("");
    const [editProjectUserId, setEditProjectUserId] = useState("");
    const [trashCanModalOpen, setTrashCanModalOpen] = useState(false);
    const [trashCanProjectId, setTrashCanProjectId] = useState(null);
    const [error, setError] = useState('');
    const accessToken = useSelector((state) => state.auth.token);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]); // Users state
    const [status, setStatus] = useState('');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        fetchProjects();
        fetchUsers();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://tesegewalt.website/api/projects", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener los proyectos:", error);
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://tesegewalt.website/api/users", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setLoading(false);
            setUsers(response.data);
        } catch (error) {
            setLoading(false);
            console.error("Error al obtener los usuarios:", error);
        }
    };

    useEffect(() => {
        const filtered = projects.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProjects(filtered);
    }, [projects, searchQuery]);

    const handleEditProject = (projectId, projectName, projectDescription, startDate, endDate, userId, editStatus) => {
        setEditModalOpen(true);
        setEditProjectId(projectId);
        setEditProjectName(projectName);
        setEditProjectDescription(projectDescription);
        setEditProjectStartDate(startDate);
        setEditProjectEndDate(endDate);
        setEditProjectUserId(userId);
        setStatus(editStatus);
    };

    const handleTrashCanProject = (projectId) => {
        setTrashCanModalOpen(true);
        setTrashCanProjectId(projectId);
    };

    const handleSaveProject = async () => {
        setLoading(true);
        try {
            const projectData = {
                name: editProjectName,
                description: editProjectDescription,
                start_date: editProjectStartDate,
                status: status,
                end_date: editProjectEndDate,
                user_id: editProjectUserId
            };

            await axios.put(`https://tesegewalt.website/api/projects/${editProjectId}`, projectData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setEditModalOpen(false);
            setLoading(false);
            fetchProjects();
            setError({ message: 'Proyecto guardado exitosamente', type: 'success' }); // Show success notification
        } catch (error) {
            setLoading(false);
            console.error("Error al guardar el proyecto:", error);
            setEditModalOpen(false);
            setError({ message: 'Error al guardar el proyecto', type: 'error' }); // Show error notification
        }
    };

    const handleTrashCanConfirm = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://tesegewalt.website/api/projects/${trashCanProjectId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setLoading(false);
            setTrashCanModalOpen(false);
            fetchProjects();
            setError({ message: 'Proyecto eliminado exitosamente', type: 'success' }); // Show success notification
        } catch (error) {
            setLoading(false);
            console.error("Error al eliminar el proyecto:", error);
            setTrashCanModalOpen(false);
            setError({ message: 'Error al eliminar el proyecto', type: 'error' }); // Show error notification
        }
    };


    const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    return (
        <Content>
            <div className="projects-container">
                <div className="projects-container__button-title">
                    <h1>Proyectos</h1>
                    <Button
                        renderIcon={Add}
                        className="create-project-button"
                        href="/projects/new"
                    >
                        Crear nuevo proyecto
                    </Button>
                </div>
                <div className="search-bar">
                    <ExpandableSearch
                        labelText="Buscar proyecto"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader isSortable={true}>
                                    Nombre del Proyecto
                                </TableHeader>
                                <TableHeader isSortable={true}>
                                    Fecha de inicio
                                </TableHeader>
                                <TableHeader isSortable={true}>
                                    Fecha limite
                                </TableHeader>
                                <TableHeader>Encargado</TableHeader>
                                <TableHeader isSortable={true}>
                                    Tareas finalizadas: 
                                </TableHeader>
                                <TableHeader className="table-header">
                                    Acciones
                                </TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <SkeletonText paragraph width="100%" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentProjects.map((project) => (
                                    <TableRow key={project.project_id}>
                                        <TableCell align="center">
                                            <Link href={'/projects/' + project.project_id}>
                                                {project.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.start_date}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.end_date}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.user.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {project.tasks_count}
                                        </TableCell>
                                        <TableCell
                                            className="actions"
                                            align="end"
                                        >
                                            <Button
                                                className="button-borderless"
                                                kind="tertiary"
                                                renderIcon={Edit}
                                                onClick={() =>
                                                    handleEditProject(
                                                        project.project_id,
                                                        project.name,
                                                        project.description,
                                                        project.start_date,
                                                        project.end_date,
                                                        project.user_id,
                                                        project.status
                                                    )
                                                }
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                kind="danger--ghost"
                                                renderIcon={TrashCan}
                                                onClick={() =>
                                                    handleTrashCanProject(
                                                        project.project_id
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    totalItems={filteredProjects.length}
                    pageSizes={[10, 15, 20]}
                    onChange={handlePageChange}
                />
            </div>

            <Modal
                open={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                modalHeading="Editar Proyecto"
                primaryButtonText="Guardar"
                secondaryButtonText="Cancelar"
                onSecondarySubmit={() => setEditModalOpen(false)}
                onRequestSubmit={handleSaveProject}
                primaryButtonDisabled={loading}
            >
                <Form>
                    <TextInput
                        id="edit-project-name"
                        labelText="Nombre del Proyecto"
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                        disabled={loading}
                    />
                    <TextInput
                        id="edit-project-description"
                        labelText="Descripción del Proyecto"
                        value={editProjectDescription}
                        onChange={(e) => setEditProjectDescription(e.target.value)}
                        disabled={loading}
                    />
                    <DatePicker
                        datePickerType="single"
                        dateFormat="m/d/Y"
                        id="edit-project-start-date"
                        onChange={(e) => setEditProjectStartDate(e[0].toISOString().split("T")[0])}
                        value={editProjectStartDate}
                        disabled={loading}
                    >
                        <DatePickerInput
                            id="edit-project-start-date"
                            labelText="Fecha de inicio"
                        />
                    </DatePicker>
                    <DatePicker
                        datePickerType="single"
                        dateFormat="m/d/Y"
                        id="edit-project-end-date"
                        onChange={(e) => setEditProjectEndDate(e[0].toISOString().split("T")[0])}
                        value={editProjectEndDate}
                        disabled={loading}
                    >
                        <DatePickerInput
                            id="edit-project-end-date"
                            labelText="Fecha límite"
                        />
                    </DatePicker>
                    <Select
                        id="edit-project-user-id"
                        labelText="Encargado"
                        value={editProjectUserId}
                        onChange={(e) => setEditProjectUserId(e.target.value)}
                        disabled={loading}
                    >
                        <SelectItem />
                        {users.map((user) => (
                            <SelectItem
                                key={user.id}
                                value={user.id}
                                text={user.name}
                            />
                        ))}
                    </Select>
                    <Select
                        id="status"
                        labelText="Estado"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <SelectItem />
                        <SelectItem text="Pendiente" value="pending" />
                        <SelectItem text="En progreso" value="in_progress" />
                        <SelectItem text="Terminado" value="finished" />
                        <SelectItem text="Cancelado" value="canceled" />
                    </Select>
                </Form>
            </Modal>

            <Modal
                open={trashCanModalOpen}
                onRequestClose={() => setTrashCanModalOpen(false)}
                modalHeading="Eliminar Proyecto"
                primaryButtonText="Confirmar"
                secondaryButtonText="Cancelar"
                onSecondarySubmit={() => setTrashCanModalOpen(false)}
                onRequestSubmit={handleTrashCanConfirm}
                primaryButtonDisabled={loading}
            >
                <p>
                    ¿Estás seguro de que deseas eliminar este proyecto?
                </p>
            </Modal>

            {error && (
                <Notification
                    type={error.type}
                    message={error.message}
                />
            )}
        </Content>
    );
};

export default ProjectsPage;

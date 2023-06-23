import React, { useState } from "react";
import {
    Content,
    DataTable,
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
    InlineNotification,
    Pagination,
    Link
} from "@carbon/react";
import { Edit, TrashCan, Add } from "@carbon/icons-react";
import "./index.css";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
        { id: 3, name: "Project 3" },
        { id: 4, name: "Project 4" },
        { id: 5, name: "Project 5" },
        { id: 6, name: "Project 6" },
        { id: 7, name: "Project 7" },
        { id: 8, name: "Project 8" },
        { id: 9, name: "Project 9" },
        { id: 10, name: "Project 10" }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [editProjectName, setEditProjectName] = useState("");
    const [TrashCanModalOpen, setTrashCanModalOpen] = useState(false);
    const [TrashCanProjectId, setTrashCanProjectId] = useState(null);
    const [notificationOpen, setNotificationOpen] = useState({ isOpen: true, type: "success" });

    const handleEditProject = (projectId, projectName) => {
        setEditModalOpen(true);
        setEditProjectId(projectId);
        setEditProjectName(projectName);
    };

    const handleTrashCanProject = (projectId) => {
        setTrashCanModalOpen(true);
        setTrashCanProjectId(projectId);
    };

    const handleSaveProject = () => {
        // Aquí puedes realizar la lógica para guardar los cambios del proyecto
        setEditModalOpen(false);
        setNotificationOpen(true);
    };

    const handleTrashCanConfirm = () => {
        // Aquí puedes realizar la lógica para eliminar el proyecto
        setTrashCanModalOpen(false);
        setNotificationOpen(true);
    };

    const handleCloseNotification = () => {
        setNotificationOpen(false);
    };

    return (
        <Content>
            <div className="projects-container">
                <div className="projects-container__button-title">
                    <h1>Proyectos</h1>
                    <Button
                        renderIcon={Add}
                        className="create-project-button"
                    >
                        Crear nuevo proyecto
                    </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader isSortable={true}>Nombre del Proyecto</TableHeader>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader isSortable={true}>Fecha de inicio</TableHeader>
                                <TableHeader isSortable={true}>Fecha limite</TableHeader>
                                <TableHeader>Encargado</TableHeader>
                                <TableHeader isSortable={true}>No. de tareas pendientes</TableHeader>
                                <TableHeader className="table-header">Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell align="center"><Link href="#">{project.name}</Link></TableCell>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell align="center">{project.name}</TableCell>
                                    <TableCell className="actions" align="end">
                                        <Button
                                            id="add-button"
                                            className="button-borderless"
                                            kind="tertiary"
                                            renderIcon={Add}
                                            onClick={() =>
                                                handleEditProject(
                                                    project.id,
                                                    project.name
                                                )
                                            }
                                        >
                                            Agregar tarea
                                        </Button>
                                        <Button
                                            className="button-borderless"
                                            kind="tertiary"
                                            renderIcon={Edit}
                                            onClick={() =>
                                                handleEditProject(
                                                    project.id,
                                                    project.name
                                                )
                                            }
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            kind="danger--ghost"
                                            renderIcon={TrashCan}
                                            onClick={() =>
                                                handleTrashCanProject(project.id)
                                            }
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination
                    totalItems={projects.length}
                    pageSizes={[10, 15, 20]}
                    onChange={handlePageChange}
                />
            </div>

            <Modal
                open={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                modalHeading="Editar Proyecto"
            >
                <Form>
                    <TextInput
                        id="edit-project-name"
                        labelText="Nombre del Proyecto"
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                    />
                    <Button onClick={handleSaveProject}>Guardar</Button>
                </Form>
            </Modal>

            <Modal
                open={TrashCanModalOpen}
                onRequestClose={() => setTrashCanModalOpen(false)}
                modalHeading="Eliminar Proyecto"
                primaryButtonText="Cancelar"
            >
                <p>¿Estás seguro que deseas eliminar este proyecto?</p>
                <Button onClick={handleTrashCanConfirm} kind="danger">
                    Eliminar
                </Button>
            </Modal>

            <div className="inline-notifications-container">
                {(notificationOpen.isOpen && notificationOpen.type === "success") && (
                    <InlineNotification
                        title="Listo"
                        subtitle="El proyecto se ha eliminado correctamente"
                        kind="success"
                        className="inline-notification"
                        onClose={handleCloseNotification}
                    />
                )}
                {(notificationOpen.isOpen && notificationOpen.type === "error") && (
                    <InlineNotification
                        title="Error"
                        subtitle="No se ha podido eliminar el proyecto"
                        className="inline-notification"
                        onClose={handleCloseNotification}
                    />
                )}

            </div>
        </Content>
    );
};

export default ProjectsPage;

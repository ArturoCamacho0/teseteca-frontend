import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    DataTable,
    TableContainer,
    TableToolbar,
    TableBatchActions,
    TableBatchAction,
    TableToolbarContent,
    TableToolbarSearch,
    Button,
    Table,
    TableHead,
    TableRow,
    TableSelectAll,
    TableHeader,
    TableBody,
    TableCell,
    TableSelectRow,
    Tag,
    DataTableSkeleton,
} from '@carbon/react';
import {
    TrashCan,
    UndefinedFilled,
    InProgress,
    CheckmarkFilled,
    Edit,
} from '@carbon/icons-react';
import TaskModal from '../Tasks';
import Notification from '../../../components/Notification';
import './index.css';

const ProjectDetailsPage = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [userNames, setUserNames] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const accessToken = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const fetchProjectData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://tesegewalt.website/api/projects/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setProject(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching project data:', error);
            setLoading(false);
        }
    }, [projectId, accessToken]);

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
        }

        fetchProjectData();
    }, [accessToken, fetchProjectData, navigate]);

    useEffect(() => {
        const fetchUser = async (userId) => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://tesegewalt.website/api/users/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setUserNames((prevUserNames) => ({
                    ...prevUserNames,
                    [userId]: response.data.name,
                }));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        if (project) {
            const taskUserIds = project.tasks.map((task) => task.user_id);
            const uniqueUserIds = Array.from(new Set(taskUserIds));
            uniqueUserIds.forEach((userId) => fetchUser(userId));
        }
    }, [project, accessToken]);

    const updateTaskStatus = async (selectedRows, status) => {
        const tasksId = selectedRows.map((row) => row.id);

        setLoading(true);
        try {
            const updatePromises = tasksId.map(async (taskId) => {
                const task = tasks.find((task) => task.task_id === parseInt(taskId));
                task.status = status;
                if (task) {
                    await axios.put(
                        `https://tesegewalt.website/api/tasks/${taskId}`,
                        task,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                }
            });

            await Promise.all(updatePromises);

            setNotification({
                message: 'El estatus de la tarea se ha actualizado exitosamente',
                type: 'success',
            });
            await fetchProjectData();
        } catch (error) {
            setNotification({
                message: error.message,
                type: 'error',
            });
            console.error('Error updating task status:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSelectedTasks = async (selectedRows) => {
        setLoading(true);
        const selectedTaskIds = selectedRows.map((row) => row.id);
        try {
            await axios.delete(
                `https://tesegewalt.website/api/projects/${projectId}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    data: {
                        taskIds: selectedTaskIds,
                    },
                }
            );

            setNotification({
                message: 'La tarea se ha eliminado exitosamente',
                type: 'success',
            });
            setLoading(false);
            fetchProjectData(); // Volver a llamar a fetchProjectData después de eliminar las tareas
        } catch (error) {
            setNotification({
                message: error.message,
                type: 'error',
            });
            console.error('Error deleting tasks:', error);
            setLoading(false);
        }
    };

    const editTask = (taskId) => {
        const task = tasks.find((task) => task.task_id === parseInt(taskId));
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const createNewTask = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    if (!project) {
        return <div>Loading project details...</div>;
    }

    const { name, description, start_date, end_date, user, tasks, status } = project;

    const headers = [
        { key: 'description', header: 'Descripción' },
        { key: 'start_date', header: 'Fecha de inicio' },
        { key: 'end_date', header: 'Fecha límite' },
        { key: 'user_id', header: 'Encargado' },
        { key: 'status', header: 'Estatus' },
        { key: 'actions', header: 'Acciones' },
    ];

    const rows = tasks
        ? tasks.map((task) => ({
            id: task.task_id.toString(),
            description: task.description,
            start_date: task.start_date,
            end_date: task.end_date,
            user_id: userNames[task.user_id] || '',
            status: task.status,
        }))
        : [];

    const completedTasks = tasks.filter((task) => task.status === 'finished');
    const remainingTasks = tasks.filter((task) => task.status !== 'finished');

    return (
        <div className="project-details">
            {loading ? (
                <DataTableSkeleton />
            ) : (
                <div>
                    <h1>
                        <strong>{name} </strong>
                        {status === 'pending' && (
                            <Tag
                                className="some-class"
                                type="magenta"
                                title="Clear Filter"
                            >
                                Pendiente
                            </Tag>
                        )}
                        {status === 'in_progress' && (
                            <Tag
                                className="some-class"
                                type="cyan"
                                title="Clear Filter"
                            >
                                En progreso
                            </Tag>
                        )}
                        {status === 'finished' && (
                            <Tag
                                className="some-class"
                                type="green"
                                title="Clear Filter"
                            >
                                Finalizado
                            </Tag>
                        )}
                        {status === 'canceled' && (
                            <Tag
                                className="some-class"
                                type="red"
                                title="Clear Filter"
                            >
                                Cancelado
                            </Tag>
                        )}
                    </h1>
                    <p>
                        <strong>Descripción:</strong> {description}
                    </p>
                    <p>
                        <strong>Fecha de inicio:</strong> {start_date}
                    </p>
                    <p>
                        <strong>Fecha límite:</strong> {end_date}
                    </p>
                    <p>
                        <strong>Encargado:</strong> {user.name + ' ' + user.lastname}
                    </p>

                    <DataTable rows={rows} headers={headers}>
                        {({
                            rows,
                            headers,
                            getHeaderProps,
                            getRowProps,
                            getSelectionProps,
                            getToolbarProps,
                            getBatchActionProps,
                            onInputChange,
                            selectedRows,
                            getTableProps,
                            getTableContainerProps,
                        }) => {
                            const batchActionProps = getBatchActionProps();

                            return (
                                <TableContainer
                                    title="Tareas"
                                    {...getTableContainerProps()}
                                    className="table-container"
                                >
                                    <TableToolbar {...getToolbarProps()} className="table-toolbar">
                                        <div className='remaining-tasks'>
                                            <p>
                                                <strong>Completadas:</strong> {completedTasks.length}
                                            </p>
                                            <p>
                                                <strong>Faltantes:</strong> {remainingTasks.length}
                                            </p>
                                        </div>
                                        <TableBatchActions {...batchActionProps}>
                                            <TableBatchAction
                                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                                renderIcon={TrashCan}
                                                onClick={() => deleteSelectedTasks(selectedRows)}
                                            >
                                                Eliminar
                                            </TableBatchAction>
                                            <TableBatchAction
                                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                                renderIcon={UndefinedFilled}
                                                onClick={() => updateTaskStatus(selectedRows, 'pending')}
                                            >
                                                Pendiente
                                            </TableBatchAction>
                                            <TableBatchAction
                                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                                renderIcon={InProgress}
                                                onClick={() => updateTaskStatus(selectedRows, 'in_progress')}
                                            >
                                                En progreso
                                            </TableBatchAction>
                                            <TableBatchAction
                                                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                                                renderIcon={CheckmarkFilled}
                                                onClick={() => updateTaskStatus(selectedRows, 'finished')}
                                            >
                                                Finalizado
                                            </TableBatchAction>
                                        </TableBatchActions>
                                        <TableToolbarContent
                                            aria-hidden={batchActionProps.shouldShowBatchActions}
                                        >
                                            <TableToolbarSearch
                                                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                                                onChange={onInputChange}
                                            />
                                            <Button
                                                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                                                onClick={() => createNewTask()}
                                                size="lg"
                                                kind="primary"
                                            >
                                                Nueva tarea
                                            </Button>
                                        </TableToolbarContent>
                                    </TableToolbar>
                                    <Table {...getTableProps()} className="data-table">
                                        <TableHead>
                                            <TableRow>
                                                <TableSelectAll {...getSelectionProps()} />
                                                {headers.map((header, i) => (
                                                    <TableHeader key={i} {...getHeaderProps({ header })}>
                                                        {header.header}
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row, i) => {
                                                const rowProps = getRowProps({ row });
                                                return (
                                                    <TableRow key={i} {...rowProps}>
                                                        <TableSelectRow {...getSelectionProps({ row })} />
                                                        {row.cells.map((cell, cellIndex) => {
                                                            if (cell.id === `${row.id}:status`) {
                                                                return (
                                                                    <TableCell align="center" key={cellIndex}>
                                                                        {cell.value === 'pending' && (
                                                                            <Tag
                                                                                className="some-class"
                                                                                type="magenta"
                                                                                title="Clear Filter"
                                                                            >
                                                                                Pendiente
                                                                            </Tag>
                                                                        )}
                                                                        {cell.value === 'in_progress' && (
                                                                            <Tag
                                                                                className="some-class"
                                                                                type="cyan"
                                                                                title="Clear Filter"
                                                                            >
                                                                                En progreso
                                                                            </Tag>
                                                                        )}
                                                                        {cell.value === 'finished' && (
                                                                            <Tag
                                                                                className="some-class"
                                                                                type="green"
                                                                                title="Clear Filter"
                                                                            >
                                                                                Finalizado
                                                                            </Tag>
                                                                        )}
                                                                    </TableCell>
                                                                );
                                                            }
                                                            if (cell.id === `${row.id}:actions`) {
                                                                return (
                                                                    <TableCell align="center" key={cellIndex}>
                                                                        <Button
                                                                            renderIcon={Edit}
                                                                            size="small"
                                                                            kind="ghost"
                                                                            onClick={() => editTask(row.id)}
                                                                        />
                                                                    </TableCell>
                                                                );
                                                            }
                                                            return (
                                                                <TableCell align="center" key={cellIndex}>
                                                                    {cell.value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            );
                        }}
                    </DataTable>
                    {isModalOpen && (
                        <TaskModal
                            projectId={projectId}
                            accessToken={accessToken}
                            closeModal={() => setIsModalOpen(false)}
                            setTasks={fetchProjectData}
                            setNotification={setNotification}
                            taskToEdit={taskToEdit}
                        />
                    )}
                </div>
            )}

            {notification && (
                <Notification type={notification.type} message={notification.message} />
            )}
        </div>
    );
};

export default ProjectDetailsPage;

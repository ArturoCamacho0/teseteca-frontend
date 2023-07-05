import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Modal, TextInput, DatePicker, DatePickerInput, Select, SelectItem } from '@carbon/react';

const TaskModal = ({ projectId, accessToken, closeModal, setTasks, setNotification, taskToEdit }) => {
    const [description, setDescription] = useState('');
    const [dates, setDates] = useState([]);
    const [status, setStatus] = useState('pending');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (taskToEdit) {
            setDescription(taskToEdit.description);
            setDates([taskToEdit.start_date, taskToEdit.end_date]);
            setStatus(taskToEdit.status);
            setUserId(taskToEdit.user_id);
            setIsEditMode(true);
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://tesegewalt.website/api/users', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                setNotification({ type: 'error', message: error.response.data.error });
            }
        };

        fetchUsers();
    }, [taskToEdit, accessToken, setNotification]);

    const saveTask = async () => {
        const task = {
            description,
            start_date: moment(dates[0]).format('YYYY-MM-DD'),
            end_date: moment(dates[1]).format('YYYY-MM-DD'),
            status,
            user_id: parseInt(userId),
            project_id: parseInt(projectId),
        };

        try {
            const response = await axios({
                method: isEditMode ? 'PUT' : 'POST',
                url: isEditMode ? `https://tesegewalt.website/api/tasks/${taskToEdit.task_id}` : 'https://tesegewalt.website/api/tasks',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                data: task
            });

            setTasks(prevTasks => isEditMode ? prevTasks.map(t => t.id === response.data.id ? response.data : t) : [...prevTasks, response.data]);
            setNotification({ type: 'success', message: 'Tarea guardada exitosamente.' });
            closeModal();
        } catch (error) {
            setNotification({ type: 'error', message: error.response.data.error });
        }
    };

    const styles = {
        input: {
            marginBottom: '1rem',
        },
    };

    return (
        <Modal
            open
            modalHeading={isEditMode ? 'Editar tarea' : 'Crear tarea'}
            primaryButtonText={isEditMode ? 'Actualizar' : 'Guardar'}
            secondaryButtonText="Cancelar"
            onRequestClose={closeModal}
            onRequestSubmit={saveTask}
        >
            <TextInput
                id="description"
                labelText="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
            />
            <DatePicker dateFormat="Y-m-d" datePickerType="range" value={dates} onChange={setDates} style={styles.input}>
                <DatePickerInput
                    id="start-date"
                    labelText="Fecha de inicio"
                    placeholder="yyyy-mm-dd"
                />
                <DatePickerInput
                    id="end-date"
                    labelText="Fecha de finalización"
                    placeholder="yyyy-mm-dd"
                />
            </DatePicker>
            <Select
                id="status"
                labelText="Estado"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.input}
            >
                <SelectItem />
                <SelectItem text="Pendiente" value="pending" />
                <SelectItem text="En progreso" value="in_progress" />
                <SelectItem text="Terminada" value="finished" />
            </Select>
            <Select
                id="userId"
                labelText="Encargado"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={styles.input}
            >
                <SelectItem />
                {users.map(user => <SelectItem key={user.id} text={`${user.name} ${user.lastname}`} value={user.id} />)}
            </Select>
        </Modal>
    );
};

export default TaskModal;

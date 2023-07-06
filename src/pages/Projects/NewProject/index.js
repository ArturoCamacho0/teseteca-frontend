import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    DatePicker,
    TextInput,
    TextArea,
    Button,
    Form,
    FormGroup,
    DatePickerInput,
    Select,
    SelectItem,
    ButtonSet,
} from '@carbon/react';
import Notification from '../../../components/Notification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const AddProjectPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dates, setDates] = useState({
        start_date: null,
        end_date: null,
    });
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    const accessToken = useSelector((state) => state.auth.token);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };


    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }

        fetchUsers();
    }, [accessToken, navigate]);

    const fetchUsers = () => {
        axios
            .get('https://tesegewalt.website/api/users', config)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener la lista de usuarios:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (!name || !description || !dates.start_date || !dates.end_date || !assignedTo) {
            return;
        }

        const formattedStartDate = dates.start_date.toISOString().split('T')[0];
        const formattedEndDate = dates.end_date.toISOString().split('T')[0];

        const project = {
            name: name,
            description: description,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            status: status,
            user_id: parseInt(assignedTo),
        };

        axios
            .post('https://tesegewalt.website/api/projects', project, config)
            .then((response) => {
                setName('');
                setDescription('');
                setDates({ start_date: null, end_date: null });
                setAssignedTo('');
                setLoading(false);

                navigate('/projects');
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
                console.error('Error al guardar el proyecto:', error);
            });
    };

    const handleStartDateChange = (date) => {
        setDates((prevState) => ({
            ...prevState,
            start_date: date[0],
        }));
    };

    const handleEndDateChange = (date) => {
        setDates((prevState) => ({
            ...prevState,
            end_date: date[0],
        }));
    };

    return (
        <div className="add-project-page">
            <div className="add-project-container">
                <h1>Agregar nuevo proyecto</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup legendText="Información del Proyecto">
                        <TextInput
                            id="name"
                            labelText="Nombre del proyecto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                        <TextArea
                            id="description"
                            labelText="Descripción de proyecto"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={loading}
                        />
                        <div className="date-picker-group">
                            <DatePicker
                                datePickerType="single"
                                dateFormat="m/d/Y"
                                id="startDate"
                                onChange={handleStartDateChange}
                                disabled={loading}
                                value={dates.start_date}
                            >
                                <DatePickerInput
                                    id="startDate"
                                    labelText="Fecha de inicio"
                                    disabled={loading}
                                    autoComplete="off"
                                />
                            </DatePicker>
                            <DatePicker
                                datePickerType="single"
                                dateFormat="m/d/Y"
                                id="endDate"
                                onChange={handleEndDateChange}
                                disabled={loading}
                                value={dates.end_date}
                            >
                                <DatePickerInput
                                    id="endDate"
                                    labelText="Fecha límite"
                                    disabled={loading}
                                    autoComplete="off"
                                />
                            </DatePicker>
                        </div>
                        <Select
                            id="assignedTo"
                            labelText="Encargado del proyecto"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            disabled={loading}
                        >
                            <SelectItem value="" text="" />
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
                            <SelectItem text="En progreso" value="in_progress" />
                            <SelectItem text="Terminado" value="finished" />
                            <SelectItem text="Cancelado" value="canceled" />
                        </Select>
                    </FormGroup>
                    <ButtonSet className="button-set">
                        <Button
                            kind="secondary"
                            disabled={loading}
                            onClick={() => navigate('/projects')}
                        >
                            Regresar
                        </Button>
                        <Button type="submit" disabled={loading} kind="primary">
                            Agregar Proyecto
                        </Button>
                    </ButtonSet>
                </Form>
                {error && <Notification message={error.message} type={'error'} />}
            </div>
        </div>
    );
};

export default AddProjectPage;

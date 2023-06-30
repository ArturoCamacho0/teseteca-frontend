import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    TextInput,
    Button,
    Form,
    FormGroup,
    Select,
    SelectItem,
    ButtonSet,
    Modal,
    ModalBody,
    Loading,
} from '@carbon/react';
import { Add } from '@carbon/icons-react';
import Notification from '../../../components/Notification';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const AddCustomerPage = () => {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.token);

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companies, setCompanies] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = () => {
        axios
            .get('https://tesegewalt.website/api/companies', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener las compañías:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Crear el objeto de cliente con los valores ingresados
        const customer = {
            name: name,
            last_name: lastname,
            email: email,
            phone: phone,
            company_id: companyId,
        };

        // Configurar el header de autorización con Bearer token
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        // Enviar la solicitud POST a la API
        axios
            .post('https://tesegewalt.website/api/clients', customer, config)
            .then((response) => {
                // Limpiar los campos después de agregar el cliente
                setName('');
                setLastname('');
                setEmail('');
                setPhone('');
                setCompanyId('');

                // Mostrar la notificación de éxito
                setNotification({ message: 'Cliente guardado correctamente', type: 'success' });

                // Redirigir al usuario a la página de clientes
                navigate('/customers');
            })
            .catch((error) => {
                // Manejar el error en caso de fallo al guardar el cliente
                console.error('Error al guardar el cliente:', error);
                setNotification({ message: 'Error al guardar el cliente', type: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddCompany = () => {
        // Aquí puedes agregar la lógica para abrir el modal y agregar una compañía nueva
        setShowCompanyModal(true);
    };

    const handleCompanyModalClose = () => {
        // Cerrar el modal y limpiar los campos
        setShowCompanyModal(false);
        setCompanyName('');
        setCompanyAddress('');
        setCompanyPhone('');
        setCompanyEmail('');
    };

    const handleCompanyModalSubmit = () => {
        setLoading(true);
        // Crear el objeto de compañía con los valores ingresados
        const company = {
            name: companyName,
            address: companyAddress,
            phone: companyPhone,
            email: companyEmail,
        };

        // Configurar el header de autorización con Bearer token
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        // Enviar la solicitud POST a la API para agregar la compañía
        axios
            .post('https://tesegewalt.website/api/companies', company, config)
            .then((response) => {
                // Actualizar el ID de la compañía seleccionada en el formulario principal
                setCompanyId(response.data.id);

                // Cerrar el modal y limpiar los campos
                setShowCompanyModal(false);
                setCompanyName('');
                setCompanyAddress('');
                setCompanyPhone('');
                setCompanyEmail('');

                fetchCompanies();

                // Mostrar la notificación de éxito
                setNotification({ message: 'Compañía guardada correctamente', type: 'success' });
            })
            .catch((error) => {
                // Manejar el error en caso de fallo al agregar la compañía
                console.error('Error al agregar la compañía:', error);
                setNotification({ message: 'Error al agregar la compañía', type: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="add-customer-page">
            <div className="add-customer-container">
                <h1>Agregar nuevo cliente</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup legendText="Información del Cliente">
                        <TextInput
                            id="name"
                            labelText="Nombre del cliente"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            placeholder={loading ? <Loading /> : ''}
                        />
                        <TextInput
                            id="lastname"
                            labelText="Apellido(s) del cliente"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            disabled={loading}
                            placeholder={loading ? <Loading /> : ''}
                        />
                        <TextInput
                            id="email"
                            labelText="Email del cliente"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            placeholder={loading ? <Loading /> : ''}
                        />
                        <TextInput
                            id="phone"
                            labelText="Teléfono del cliente"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={loading}
                            placeholder={loading ? <Loading /> : ''}
                        />

                        <div className="input-group">
                            <Select
                                id="company_id"
                                labelText="Compañía del cliente"
                                onChange={(e) => setCompanyId(e.target.value)}
                                value={companyId}
                                style={{ marginRight: '1rem' }}
                                disabled={loading}
                            >
                                <SelectItem value="" text="" />
                                {companies.map((company) => (
                                    <SelectItem
                                        key={company.company_id}
                                        value={company.company_id}
                                        text={company.name}
                                    />
                                ))}
                            </Select>
                            <Button
                                kind="tertiary"
                                renderIcon={Add}
                                onClick={handleAddCompany}
                                disabled={loading}
                            >
                                Agregar Compañía
                            </Button>
                        </div>
                    </FormGroup>

                    <ButtonSet className="button-set">
                        <Button kind="secondary" onClick={() => navigate('/customers')}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            kind="primary"
                            disabled={loading}
                            renderIcon={loading ? Loading : undefined}
                        >
                            Guardar
                        </Button>
                    </ButtonSet>
                </Form>
            </div>

            <Modal
                open={showCompanyModal}
                onRequestClose={handleCompanyModalClose}
                shouldSubmitOnEnter={false}
                primaryButtonText="Guardar"
                primaryButtonDisabled={loading}
                secondaryButtonText="Cancelar"
                modalHeading="Agregar Compañía"
                onRequestSubmit={handleCompanyModalSubmit}
            >
                <ModalBody>
                    <Form>
                        <FormGroup legendText="Información de la Compañía">
                            <TextInput
                                id="companyName"
                                labelText="Nombre de la compañía"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                disabled={loading}
                            />
                            <TextInput
                                id="companyAddress"
                                labelText="Dirección de la compañía"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                disabled={loading}
                            />
                            <TextInput
                                id="companyPhone"
                                labelText="Teléfono de la compañía"
                                value={companyPhone}
                                onChange={(e) => setCompanyPhone(e.target.value)}
                                disabled={loading}
                            />
                            <TextInput
                                id="companyEmail"
                                labelText="Email de la compañía"
                                value={companyEmail}
                                type="email"
                                onChange={(e) => setCompanyEmail(e.target.value)}
                                disabled={loading}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            {notification && (
                <Notification message={notification.message} type={notification.type} />
            )}
        </div>
    );
};

export default AddCustomerPage;

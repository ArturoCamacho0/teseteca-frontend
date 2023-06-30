import React, { useState, useEffect } from "react";
import axios from "axios";
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
    Select,
    SelectItem,
    SkeletonText,
} from "@carbon/react";
import { Edit, TrashCan, Add } from "@carbon/icons-react";
import { useSelector } from "react-redux";
import Notification from "../../components/Notification";
import "./index.css";

const CustomersPage = () => {
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [editCustomerName, setEditCustomerName] = useState("");
    const [editCustomerLastName, setEditCustomerLastName] = useState("");
    const [editCustomerEmail, setEditCustomerEmail] = useState("");
    const [editCustomerPhone, setEditCustomerPhone] = useState("");
    const [editCustomerCompany, setEditCustomerCompany] = useState("");
    const [trashCanModalOpen, setTrashCanModalOpen] = useState(false);
    const [trashCanCustomerId, setTrashCanCustomerId] = useState(null);
    const [notification, setNotification] = useState({
        isOpen: false,
        type: "success",
        message: "",
    });

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        fetchCustomers();
        fetchCompanies();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://tesegewalt.website/api/clients", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            setCustomers(response.data);
        } catch (error) {
            setLoading(false);
            console.error("Error al obtener los clientes:", error);
        }
    };

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://tesegewalt.website/api/companies", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
            setCompanies(response.data);
        } catch (error) {
            setLoading(false);
            console.error("Error al obtener las compañías:", error);
        }
    };

    const getCompanyName = (companyId) => {
        const company = companies.find((c) => c.id === companyId);
        return company ? company.name : "";
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const handleEditCustomer = (customerId, customerName, customerLastName, customerEmail, customerPhone, customerCompany) => {
        setEditModalOpen(true);
        setEditCustomerId(customerId);
        setEditCustomerName(customerName);
        setEditCustomerLastName(customerLastName);
        setEditCustomerEmail(customerEmail);
        setEditCustomerPhone(customerPhone);
        setEditCustomerCompany(customerCompany); // Establecer el valor de la compañía seleccionada
    };

    const handleTrashCanCustomer = (customerId) => {
        setTrashCanModalOpen(true);
        setTrashCanCustomerId(customerId);
    };

    const handleSaveCustomer = async () => {
        setLoading(true);
        try {
            const updatedCustomer = {
                name: editCustomerName,
                last_name: editCustomerLastName,
                email: editCustomerEmail,
                phone: editCustomerPhone,
                company_id: editCustomerCompany,
            };

            await axios.put(`https://tesegewalt.website/api/clients/${editCustomerId}`, updatedCustomer, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEditModalOpen(false);
            setNotification({
                isOpen: true,
                type: "success",
                message: "Cliente actualizado exitosamente.",
            });
            fetchCustomers();
            setLoading(false);
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            setNotification({
                isOpen: true,
                type: "error",
                message: "Hubo un error al actualizar el cliente. Por favor, inténtalo nuevamente.",
            });
            setLoading(false);
        }
    };

    const handleTrashCanConfirm = async () => {
        setLoading(true);
        try {
            await axios.delete(`https://tesegewalt.website/api/clients/${trashCanCustomerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTrashCanModalOpen(false);
            setNotification({
                isOpen: true,
                type: "success",
                message: "Cliente eliminado exitosamente.",
            });
            fetchCustomers();
            setLoading(false);
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            setNotification({
                isOpen: true,
                type: "error",
                message: "Hubo un error al eliminar el cliente. Por favor, inténtalo nuevamente.",
            });
            setLoading(false);
        }
    };

    const handleCloseNotification = () => {
        setNotification({
            isOpen: false,
            type: "success",
            message: "",
        });
    };

    return (
        <Content>
            <div className="customers-container">
                <div className="customers-container__button-title">
                    <h1>Clientes</h1>
                    <Button renderIcon={Add} className="create-customer-button" href="/customers/new">
                        Agregar un nuevo cliente
                    </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader isSortable={true}>Nombre del cliente</TableHeader>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Teléfono</TableHeader>
                                <TableHeader isSortable={true}>Compañía</TableHeader>
                                <TableHeader className="table-header">Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ?
                                (<TableRow>
                                    <TableCell><SkeletonText /></TableCell>
                                    <TableCell><SkeletonText /></TableCell>
                                    <TableCell><SkeletonText /></TableCell>
                                    <TableCell><SkeletonText /></TableCell>
                                    <TableCell><SkeletonText /></TableCell>
                                </TableRow>) : currentCustomers.map((customer) => (
                                    <TableRow key={customer.client_id}>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{getCompanyName(customer.company_id)}</TableCell>
                                        <TableCell className="actions">
                                            <Button
                                                className="button-borderless"
                                                kind="tertiary"
                                                renderIcon={Edit}
                                                onClick={() =>
                                                    handleEditCustomer(
                                                        customer.client_id,
                                                        customer.name,
                                                        customer.last_name,
                                                        customer.email,
                                                        customer.phone,
                                                        customer.company_id
                                                    )
                                                }
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                kind="danger--ghost"
                                                renderIcon={TrashCan}
                                                onClick={() => handleTrashCanCustomer(customer.client_id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination totalItems={customers.length} pageSizes={[10, 15, 20]} onChange={handlePageChange} />
            </div>

            <Modal
                open={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                modalHeading="Editar Cliente"
                primaryButtonText="Guardar"
                secondaryButtonText="Cancelar"
                onSecondarySubmit={() => setEditModalOpen(false)}
                onRequestSubmit={handleSaveCustomer}
                primaryButtonDisabled={loading}
            >
                <Form>
                    <TextInput
                        id="edit-customer-name"
                        labelText="Nombre"
                        value={editCustomerName}
                        onChange={(e) => setEditCustomerName(e.target.value)}
                        disabled={loading}
                    />
                    <TextInput
                        id="edit-customer-lastname"
                        labelText="Apellido"
                        value={editCustomerLastName}
                        onChange={(e) => setEditCustomerLastName(e.target.value)}
                        disabled={loading}
                    />
                    <TextInput
                        id="edit-customer-email"
                        labelText="Correo electrónico"
                        value={editCustomerEmail}
                        onChange={(e) => setEditCustomerEmail(e.target.value)}
                        disabled={loading}
                    />
                    <TextInput
                        id="edit-customer-phone"
                        labelText="Teléfono"
                        value={editCustomerPhone}
                        onChange={(e) => setEditCustomerPhone(e.target.value)}
                        disabled={loading}
                    />
                    <Select
                        id="edit-customer-company"
                        labelText="Compañía"
                        value={editCustomerCompany}
                        onChange={(e) => setEditCustomerCompany(e.target.value)}
                        disabled={loading}
                    >
                        {companies.map((company) => (
                            <SelectItem key={company.company_id} value={company.company_id} text={company.name} />
                        ))}
                    </Select>
                </Form>
            </Modal>

            <Modal
                danger
                open={trashCanModalOpen}
                onRequestClose={() => setTrashCanModalOpen(false)}
                modalHeading="Eliminar cliente"
                primaryButtonText="Confirmar"
                secondaryButtonText="Cancelar"
                onSecondarySubmit={() => setTrashCanModalOpen(false)}
                onRequestSubmit={handleTrashCanConfirm}
            >
                <p>¿Estás seguro de que deseas eliminar este cliente?</p>
            </Modal>

            {notification.isOpen && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={handleCloseNotification}
                />
            )}
        </Content>
    );
};

export default CustomersPage;
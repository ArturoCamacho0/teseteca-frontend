import React, { useEffect, useState } from 'react';
import {
    TextInput,
    Button,
    ButtonSkeleton,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../../actions/authActions';
import Notification from '../../components/Notification';
import './index.css';


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = regex.test(username);
        const isFieldsEmpty = username === '' || password === '' || name === '' || lastName === '';

        setValidationError(isFieldsEmpty ? "Debes completar todos los campos" :
            !isEmailValid ? "Introduce un email válido" :
                password.length < 8 ? "La contrasena debe tener al menos 8 caracteres" : "");
    }, [username, password, name, lastName]);

    const handleRegister = () => {
        setError('');
        if (!validationError) {
            setLoading(true);

            const registerData = {
                name: name,
                lastName: lastName,
                email: username,
                password: password,
            };

            axios
                .post('https://tesegewalt.website/api/register', registerData)
                .then((response) => {
                    setLoading(false);
                    const data = response.data;
                    if (data.token) {
                        dispatch(registerSuccess(data.token, data.user));
                        navigate('/home');
                    } else {
                        setError(data.error);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError(error.response.data.message);
                    setLoading(false);
                });
        }
    };

    const handleNotificationClose = () => {
        setError('');
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1 className="register-heading">Regístrate para continuar</h1>
                <div className="input-container">
                    <TextInput
                        id="name"
                        disabled={loading}
                        labelText="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-input"
                        size="lg"
                        type='text'
                    />
                </div>
                <div className="input-container">
                    <TextInput
                        id="lastname"
                        disabled={loading}
                        labelText="Apellidos"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="register-input"
                        size="lg"
                        type='text'
                    />
                </div>
                <div className="input-container">
                    <TextInput
                        id="email"
                        disabled={loading}
                        labelText="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-input"
                        size="lg"
                        type='email'
                    />
                </div>
                <div className="input-container">
                    <TextInput
                        id="password"
                        disabled={loading}
                        type="password"
                        labelText="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        size="lg"
                    />
                    {validationError !== '' && <span className="error-message">{validationError}</span>}
                </div>

                {loading ?
                    <ButtonSkeleton className="register-button" /> :
                    <Button
                        onClick={handleRegister}
                        className="register-button"
                        renderIcon={ArrowRight}
                        disabled={loading || validationError !== ''}
                    >
                        Continuar
                    </Button>
                }
                <p className="login-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </div>
            {error !== '' && (<Notification message={error} type={'error'} handleNotificationClose={handleNotificationClose} />)}
        </div>
    );
};

export default RegisterPage;

import React, { useEffect, useState } from 'react';
import {
    TextInput,
    Button,
    ButtonSkeleton,
    InlineNotification,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';
import './index.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
        const isFieldsEmpty = username === '' || password === '';

        setValidationError(
            isFieldsEmpty
                ? 'Debes completar todos los campos'
                : isEmailValid
                    ? ''
                    : 'Introduce un email válido'
        );
    }, [username, password]);

    const handleLogin = () => {
        setError('');
        if (!validationError) {
            setLoading(true);

            const loginData = {
                email: username,
                password: password,
            };

            axios
                .post('https://tesegewalt.website/api/login', loginData)
                .then((response) => {
                    setLoading(false);
                    const data = response.data;
                    if (data.token) {
                        dispatch(loginSuccess(data.token, data.user));
                        navigate('/home');
                    } else {
                        setError(data.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    //setError(error.response.status === 401 ? 'El usuario o contraseña es incorrecto' : error.response.data.message);
                    setLoading(false);
                });
        }
    };

    const handleNotificationClose = () => {
        setError('');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-heading">Inicia sesión para continuar</h1>
                <div className="input-container">
                    <TextInput
                        id="email"
                        disabled={loading}
                        labelText="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        size="lg"
                        type="email"
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
                        className="login-input"
                        size="lg"
                    />
                    {validationError !== '' && (
                        <span className="error-message">{validationError}</span>
                    )}
                </div>

                {loading ? (
                    <ButtonSkeleton className="login-button" />
                ) : (
                    <Button
                        onClick={handleLogin}
                        className="login-button"
                        renderIcon={ArrowRight}
                        disabled={loading || validationError !== ''}
                    >
                        Continuar
                    </Button>
                )}
                <p className="register-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate</a>
                </p>
            </div>
            {error !== '' && (
                <div className="fixed-notification">
                    <InlineNotification
                        title="Error"
                        subtitle={error}
                        kind="error"
                        onClose={handleNotificationClose}
                    />
                </div>
            )}
        </div>
    );
};

export default LoginPage;

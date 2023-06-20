import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    Button,
    InlineLoading
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './index.css';
import { loginRequest, loginSuccess, loginFailure } from '../../actions/authActions';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = regex.test(username);
        const isFieldsEmpty = username === '' || password === '';

        setError(isFieldsEmpty ? "Debes completar todos los campos" : isEmailValid ? "" : "Introduce un email válido");
    }, [username, password]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            // Realiza la solicitud de inicio de sesión a la API y obtén el token
            loginRequest();
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Guarda el token en el estado utilizando la acción loginSuccess
                loginSuccess(data.token);
            } else {
                // Maneja el error utilizando la acción loginFailure
                loginFailure(data.error);
            }
        } catch (error) {
            // Maneja errores de red u otros errores
            loginFailure('Error de conexión');
        }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-heading">Inicia sesi&oacute;n para continuar</h1>
                <div className="input-container">
                    <TextInput
                        id="email"
                        disabled={loading}
                        labelText="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        size="xl"
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
                        className="login-input"
                        size="xl"
                    />
                    {error !== '' && <span className="error-message">{error}</span>}
                </div>

                {loading ?
                    <InlineLoading description="Cargando..." /> :
                    <Button
                        onClick={handleLogin}
                        className="login-button"
                        renderIcon={ArrowRight}
                        disabled={loading || error !== ''}
                    >
                        Continuar
                    </Button>
                }
                <p className="register-link">
                    ¿No tienes cuenta? <a href="/register">Registrate</a>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    error: state.auth.error,
});

const mapDispatchToProps = {
    loginRequest,
    loginSuccess,
    loginFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
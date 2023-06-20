import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    TextInput,
    Button,
    InlineLoading
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './index.css';
import { registerRequest, registerSuccess, registerFailure } from '../../actions/authActions';


const RegisterPage = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = regex.test(username);
        const isFieldsEmpty = username === '' || password === '' || name === '' || lastName === '';

        setError(isFieldsEmpty ? "Debes completar todos los campos" :
            !isEmailValid ? "Introduce un email válido" :
                password.length < 8 ? "La contrasena debe tener al menos 8 caracteres" : "");
    }, [username, password, name, lastName]);

    const handleRegister = async () => {
        try {
            setLoading(true);
            // Realize the register request to the API and obtain the token
            registerRequest();
            const response = await fetch('localhost:80/api/register', {
                method: 'POST',
                body: JSON.stringify({ username, password, name, lastName }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Save the token to the state using the registerSuccess action
                registerSuccess(data.token);
            } else {
                // Handle the error using the registerFailure action
                registerFailure(data.error);
            }
        } catch (error) {
            // Handle network errors or other errors
            registerFailure('Error de conexión');
        }
        setLoading(false);
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
                        size="xl"
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
                        size="xl"
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
                        className="register-input"
                        size="xl"
                    />
                    {error !== '' && <span className="error-message">{error}</span>}
                </div>

                {loading ?
                    <InlineLoading description="Cargando..." /> :
                    <Button
                        onClick={handleRegister}
                        className="register-button"
                        renderIcon={ArrowRight}
                        disabled={loading || error !== ''}
                    >
                        Continuar
                    </Button>
                }
                <p className="login-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
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
    registerRequest,
    registerSuccess,
    registerFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

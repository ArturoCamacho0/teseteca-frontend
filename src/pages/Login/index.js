import React, { useState } from 'react';
import {
    TextInput,
    Button,
    InlineLoading
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './index.css'; // Import the CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            console.log('Login clicked');
        }, 2000);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-heading">Inicia sesi&oacute;n para continuar</h1>
                <div className="input-container">
                    <TextInput
                        id="username"
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
                        onBlur={() => {
                            if (password.length < 8) {
                                setError('La contraseña debe tener al menos 8 caracteres');
                            } else {
                                setError('');
                            }
                        }}
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
                        disabled={loading || username === '' || password.length < 8}
                    >
                        Continuar
                    </Button>}
                <p className="register-link">
                    ¿No tienes cuenta? <a href="/register">Registrate</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

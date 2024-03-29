import React from 'react';
import {
    Header as CarbonHeader,
    HeaderMenuButton,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
} from '@carbon/react';
import { FaceAdd, Logout } from '@carbon/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout(token));
        navigate('/login');
    };

    return (
        <CarbonHeader aria-label="Header">
            <SkipToContent />

            <HeaderMenuButton
                aria-label="Open menu"
                onClick={() => {
                    // Handle menu button click
                }}
            />

            <HeaderName prefix="Gewalt" >
                [Administraci&oacute;n de proyectos]
            </HeaderName>

            {token &&
                <>
                    <HeaderNavigation aria-label="Navigation">
                        <HeaderMenuItem href="/home">
                            Inicio
                        </HeaderMenuItem>
                        <HeaderMenuItem href="/projects">
                            Proyectos
                        </HeaderMenuItem>
                        <HeaderMenuItem href="/customers">
                            Clientes
                        </HeaderMenuItem>
                    </HeaderNavigation>

                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label="Registrar usuario"
                            onClick={() => navigate('/register')}
                        >
                            <FaceAdd />
                        </HeaderGlobalAction>

                        <HeaderGlobalAction
                            aria-label="Cerrar sesi&oacute;n"
                            onClick={handleLogout}
                        >
                            <Logout />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </>
            }
        </CarbonHeader>
    );
};

export default Header;

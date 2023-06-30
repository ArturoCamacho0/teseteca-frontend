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
import { NotificationFilled, Search, Logout } from '@carbon/icons-react';
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
                        <HeaderMenuItem href="#">
                            Tareas
                        </HeaderMenuItem>
                    </HeaderNavigation>

                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label="Notificaciones"
                            onClick={() => {
                                // Handle notification action click
                            }}
                        >
                            <NotificationFilled />
                        </HeaderGlobalAction>

                        <HeaderGlobalAction
                            aria-label="Buscar"
                            onClick={() => {
                                // Handle switcher action click
                            }}
                        >
                            <Search />
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

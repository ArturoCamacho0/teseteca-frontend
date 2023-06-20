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
import { NotificationFilled, Search } from '@carbon/icons-react';

const Header = () => {
    return (
        <CarbonHeader aria-label="Header">
            <SkipToContent />

            <HeaderMenuButton
                aria-label="Open menu"
                onClick={() => {
                    // Handle menu button click
                }}
            />

            <HeaderName href="#" prefix="Gewalt" >
                [Administraci&oacute;n de proyectos]
            </HeaderName>

            <HeaderNavigation aria-label="Navigation">
                <HeaderMenuItem href="#">
                    Inicio
                </HeaderMenuItem>
                <HeaderMenuItem href="#">
                    Proyectos
                </HeaderMenuItem>
                <HeaderMenuItem href="#">
                    Equipos
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
            </HeaderGlobalBar>
        </CarbonHeader>
    );
};

export default Header;

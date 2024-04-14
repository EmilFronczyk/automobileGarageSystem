import {
    CSSObject,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled, Theme
} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import BuildIcon from '@mui/icons-material/Build';
import MuiDrawer from '@mui/material/Drawer';
import ContactsIcon from '@mui/icons-material/Contacts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import "./Menu.css";
import {useNavigate} from "react-router-dom";

type MenuProps = {
    setMenuSize: Dispatch<SetStateAction<string>>;
};
const Menu = ({setMenuSize}: MenuProps) => {
    const drawerWidth = 240;
    const openedMixin = (theme: Theme): CSSObject => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme: Theme): CSSObject => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    });


    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        if (open) {
            setMenuSize("80px");
        } else {
            setMenuSize("250px");
        }
        setOpen(!open);
    };


    const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
        ({theme, open}) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );
    const iconsTable = [<HomeIcon/>, <EngineeringIcon/>, <WarehouseIcon/>, <ContactsIcon/>, <BuildIcon/>,
        <DirectionsCarIcon/>];
    const urlTable = ["/desktop", "/workers", "/warehouse", "/clients", "/repairs", "/cars"];
    const navigate = useNavigate();
    return (
        <Drawer className="menuContainer" variant="permanent" open={open}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{marginLeft: 0.2}}
                className="iconButton"
            >
                {open ? <ChevronLeftIcon/> : <MenuIcon/>}
            </IconButton>
            <List>
                {['Strona główna', 'Pracownicy', 'Magazyn', 'Klienci', 'Naprawy', 'Samochody'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            className="iconButton"
                            onClick={() => navigate(urlTable[index])}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                className="iconButton"
                            >
                                {iconsTable[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Menu;
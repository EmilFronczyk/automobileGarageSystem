import {ReactNode, useState} from "react";
import Menu from "../components/menu/Menu";
import {Box} from "@mui/material";
import {useLocation} from "react-router-dom";

type MainLayoutProps = {
    children: ReactNode;
}
const MainLayout = ({children}: MainLayoutProps) => {
    const location = useLocation();
    const [menuSize, setMenuSize] = useState("80px");
    return (
        <div>
            {location.pathname !== "/" && <Menu setMenuSize={setMenuSize}></Menu>}
            <Box component="main"
                 sx={{flexGrow: 1, marginLeft: `${location.pathname !== "/" ? menuSize : 0}`, height: 'max-content'}}>
                {children}
            </Box>
        </div>
    )
}

export default MainLayout;
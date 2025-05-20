import {Layout, Menu} from 'react-admin';
import MapIcon from '@mui/icons-material/Map';
import {ListItemIcon, SvgIcon} from "@mui/material";
import {ReportIcon} from "../../assets/ReportIcon.tsx";

export const AdminMEnu = () => (
    <Menu>
        <Menu.Item to="/map" primaryText="Карта складу" leftIcon={<MapIcon />} />
        <Menu.Item to="/section/load" primaryText="Навантаження на секції" leftIcon={<ReportIcon/>} />
        <Menu.Item to="/item/history" primaryText="Історія перміщень" leftIcon={<ReportIcon/>} />
        <Menu.Item to="/item/idle" primaryText="Неактивні товари" leftIcon={<ReportIcon/>} />
        <Menu.Item to="/item/history/peek" primaryText="Піковий час" leftIcon={<ReportIcon/>} />
        <Menu.ResourceItem name="section" />
        <Menu.ResourceItem name="item" />
        <Menu.ResourceItem name="gate" />
    </Menu>
);

// @ts-ignore
export const AdminLayout = ({ children }) => (
    <Layout menu={AdminMEnu}>
        {children}
    </Layout>
);

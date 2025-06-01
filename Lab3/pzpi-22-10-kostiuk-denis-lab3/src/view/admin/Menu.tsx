import { Layout, Menu, useTranslate } from 'react-admin';
import MapIcon from '@mui/icons-material/Map';
import { ReportIcon } from "../../assets/ReportIcon.tsx";

export const AdminMenu = () => {
        const translate = useTranslate();

        return (
            <Menu>
                    <Menu.Item
                        to="/map"
                        primaryText={translate('custom.menu.map')}
                        leftIcon={<MapIcon />}
                    />
                    <Menu.ResourceItem name="section" />
                    <Menu.ResourceItem name="item" />
                    <Menu.ResourceItem name="gate" />
                    <Menu.ResourceItem name="user" />
                    <Menu.Item
                        to="/section/load"
                        primaryText={translate('custom.menu.sectionLoad')}
                        leftIcon={<ReportIcon />}
                    />
                    <Menu.Item
                        to="/item/history"
                        primaryText={translate('custom.menu.itemHistory')}
                        leftIcon={<ReportIcon />}
                    />
                    <Menu.Item
                        to="/item/idle"
                        primaryText={translate('custom.menu.itemIdle')}
                        leftIcon={<ReportIcon />}
                    />
                    <Menu.Item
                        to="/item/history/peek"
                        primaryText={translate('custom.menu.peakTime')}
                        leftIcon={<ReportIcon />}
                    />
                    <Menu.Item
                        to="/settings"
                        primaryText={translate('custom.menu.settings')}
                        leftIcon={<ReportIcon />}
                    />
            </Menu>
        );
};

// @ts-ignore
export const AdminLayout = ({ children }) => (
    <Layout menu={AdminMenu}>
            {children}
    </Layout>
);

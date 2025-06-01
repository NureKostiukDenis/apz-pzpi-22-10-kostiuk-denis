import { Admin, CustomRoutes, Resource } from 'react-admin';

import { itemProvider } from './data/provider/itemsProvider.ts';
import { ItemList, ItemCreate, ItemEdit, ItemShow } from './resources/items';
import { SectionCreate, SectionEdit, SectionList, SectionShow } from "./resources/section.tsx";
import { GateCreate, GateEdit, GateList, GateShow } from "./resources/gate.tsx";
import SectionMap from "./view/admin/pages/SectionMap.tsx";
import SectionLoadPage from "./view/admin/pages/SectionLoadPage.tsx";
import ItemMovementHistoryPage from "./view/admin/pages/ItemMovementHistoryPage.tsx";
import { ItemsWithoutMovementPage } from "./view/admin/pages/ItemsWithouMovement.tsx";
import { PeakActivityHoursPage } from "./view/admin/pages/ActivityHoues.tsx";
import { authProvider } from "./data/provider/authProvider.ts";
import { i18nProvider } from "./data/provider/i18nProvider.ts";
import { Settings } from "./view/admin/pages/Settings.tsx";
import { AdminLayout } from "./view/admin/Menu.tsx";
import { Route } from 'react-router-dom';
import {UserCreate, UserEdit, UserList, UserShow} from "./view/admin/componets/UserComponents.tsx";

const App = () => (
    <Admin
        dataProvider={itemProvider}
        authProvider={authProvider}
        i18nProvider={i18nProvider}
        layout={AdminLayout}
    >
        <CustomRoutes>
            <Route path="/map" element={<SectionMap />} />
            <Route path="/section/load" element={<SectionLoadPage />} />
            <Route path="/item/history" element={<ItemMovementHistoryPage />} />
            <Route path="/item/idle" element={<ItemsWithoutMovementPage />} />
            <Route path="/item/history/peek" element={<PeakActivityHoursPage />} />
            <Route path="/settings" element={<Settings />} />
        </CustomRoutes>

        <Resource
            name="item"
            list={ItemList}
            create={ItemCreate}
            edit={ItemEdit}
            show={ItemShow}
            recordRepresentation="name"
        />

        <Resource
            name="section"
            list={SectionList}
            create={SectionCreate}
            edit={SectionEdit}
            show={SectionShow}
            recordRepresentation="name"
        />

        <Resource
            name="gate"
            list={GateList}
            create={GateCreate}
            edit={GateEdit}
            show={GateShow}
            recordRepresentation="name"
        />

        <Resource
            name="user"
            list={UserList}
            create={UserCreate}
            edit={UserEdit}
            show={UserShow}
            recordRepresentation="name"
        />
    </Admin>
);

export default App;

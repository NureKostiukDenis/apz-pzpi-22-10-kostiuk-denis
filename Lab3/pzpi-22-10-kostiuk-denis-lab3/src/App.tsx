import {Admin, CustomRoutes, Resource} from 'react-admin';

import { itemProvider } from './data/provider/itemsProvider.ts';

import { ItemList, ItemCreate, ItemEdit, ItemShow } from './resources/items';
import {SectionCreate, SectionEdit, SectionList, SectionShow} from "./resources/section.tsx";
import {GateCreate, GateEdit, GateList, GateShow} from "./resources/gate.tsx";
import SectionMap from "./view/admin/pages/SectionMap.tsx";
import { Route } from 'react-router-dom';
import {AdminLayout} from "./view/admin/Menu.tsx";
import SectionLoadPage from "./view/admin/pages/SectionLoadPage.tsx";
import ItemMovementHistoryPage from "./view/admin/pages/ItemMovementHistoryPage.tsx";
import {ItemsWithoutMovementPage} from "./view/admin/pages/ItemsWithouMovement.tsx";
import {PeakActivityHoursPage} from "./view/admin/pages/ActivityHoues.tsx";
import {authProvider} from "./data/provider/authProvider.ts";

const App = () => (
    <Admin
        dataProvider={itemProvider}
        authProvider={authProvider}
        layout={AdminLayout}
    >
        <CustomRoutes>
            <Route path="/map" element={<SectionMap />} />
            <Route path="/section/load" element={<SectionLoadPage />} />
            <Route path="/item/history" element={<ItemMovementHistoryPage />} />
            <Route path="/item/idle" element={<ItemsWithoutMovementPage />} />
            <Route path="/item/history/peek" element={<PeakActivityHoursPage/>} />
        </CustomRoutes>

        <Resource
            name="item"
            list={ItemList}
            create={ItemCreate}
            edit={ItemEdit}
            show={ItemShow}
            options={{ label: 'Товари' }}
            recordRepresentation="name"
        />

        <Resource
            name="section"
            list={SectionList}
            create={SectionCreate}
            edit={SectionEdit}
            show={SectionShow}
            options={{ label: 'Секції' }}
            recordRepresentation="name"
        />

        <Resource
            name="gate"
            list={GateList}
            create={GateCreate}
            edit={GateEdit}
            show={GateShow}
            options={{ label: 'Ворота' }}
            recordRepresentation="name"
        />
    </Admin>
);

export default App;

// src/resources/gateComponents.tsx (или другое имя файла)

import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    Show,
    SimpleShowLayout,
    required,
    type ListProps,
    type EditProps,
    type CreateProps,
    type ShowProps,
    type ResourceProps,
} from "react-admin";

export interface GateRecord {
    id: number;
    code: string;
    warehouseId?: number;
    type?: string;
    sectionId?: string;
}


export const GateList: React.FC<ListProps> = (props) => (
    <List {...props} title="Ворота склада">
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="code" label="Код ворот" />
            <TextField source="type" label="Тип ворот" />
            <TextField source="sectionId" label="Секція" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const GateEdit: React.FC<EditProps> = (props) => (
    <Edit {...props} title="Редактирование ворот">
        <SimpleForm>
            <TextInput source="id" label="ID" disabled />
            <TextInput
                source="code"
                label="Код ворот"
                validate={required("Код обязателен")}
            />
            <TextInput
                source="type"
                label="Тип ворот"
                validate={required("Тип обов'язковий")}
            />
        </SimpleForm>
    </Edit>
);

export const GateCreate: React.FC<CreateProps> = (props) => (
    <Create {...props} title="Создание новых ворот">
        <SimpleForm>
            <TextInput
                source="code"
                label="Код ворот"
                validate={required("Код обов'язковий")}
            />
            <TextInput
                source="type"
                label="Тип ворот"
                validate={required("Тип обов'язковий")}
            />
        </SimpleForm>
    </Create>
);

export const GateShow: React.FC<ShowProps> = (props) => (
    <Show {...props} title="Просмотр ворот">
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="code" label="Код ворот" />
            <TextField source="type" label="Тип ворот" />
            <TextField source="sectionId" label="Секція" />
        </SimpleShowLayout>
    </Show>
);

export const gateResource: ResourceProps = {
    name: "gates",
    list: GateList,
    edit: GateEdit,
    create: GateCreate,
    show: GateShow,
    options: { label: "Ворота" },
};

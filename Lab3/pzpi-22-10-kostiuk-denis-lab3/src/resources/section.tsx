// src/resources/sections.tsx (или gate.tsx, если это ваше соглашение)

import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DeleteButton,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    Show,
    SimpleShowLayout,
    required,
    minValue,
    type ListProps, type EditProps, type CreateProps, type ShowProps, type ResourceProps,
} from "react-admin";

export interface SectionRecord {
    id: number;
    name: string;
    capacity: number;
}

export const SectionList: React.FC<ListProps> = (props) => (
    <List {...props} title="Секции склада">
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название секции" />
            <NumberField source="capacity" label="Вместимость" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const SectionEdit: React.FC<EditProps> = (props) => (
    <Edit {...props} title="Редактирование секции">
        <SimpleForm>
            <TextInput source="id" label="ID" disabled />
            <TextInput
                source="name"
                label="Название секции"
                validate={required("Название обязательно")}
            />
            <NumberInput
                source="capacity"
                label="Вместимость"
                validate={[required("Вместимость обязательна"), minValue(1, "Вместимость должна быть больше 0")]}
            />
        </SimpleForm>
    </Edit>
);

export const SectionCreate: React.FC<CreateProps> = (props) => (
    <Create {...props} title="Создание новой секции">
        <SimpleForm>
            <TextInput
                source="name"
                label="Название секции"
                validate={required("Название обязательно")}
            />
            <NumberInput
                source="capacity"
                label="Вместимость"
                validate={[required("Вместимость обязательна"), minValue(1, "Вместимость должна быть больше 0")]}
            />
        </SimpleForm>
    </Create>
);

export const SectionShow: React.FC<ShowProps> = (props) => (
    <Show {...props} title="Просмотр секции">
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название секции" />
            <NumberField source="capacity" label="Вместимость" />
        </SimpleShowLayout>
    </Show>
);

export const sectionResource: ResourceProps = {
    name: "sections",
    list: SectionList,
    edit: SectionEdit,
    create: SectionCreate,
    show: SectionShow,
    options: { label: "Секції" },
};

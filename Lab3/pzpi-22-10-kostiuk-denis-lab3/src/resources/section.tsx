// src/resources/sections.tsx (або інша назва файлу, як домовлено)

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
    <List {...props} title="resources.section.name">
        <Datagrid>
            <TextField source="id" label="resources.section.fields.id" />
            <TextField source="name" label="resources.section.fields.name" />
            <NumberField source="capacity" label="resources.section.fields.capacity" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const SectionEdit: React.FC<EditProps> = (props) => (
    <Edit {...props} title="Редагування секції">
        <SimpleForm>
            <TextInput source="id" label="resources.section.fields.id" disabled />
            <TextInput
                source="name"
                label="resources.section.fields.name"
                validate={required("resources.section.fields.name_required")}
            />
            <NumberInput
                source="capacity"
                label="resources.section.fields.capacity"
                validate={[
                    required("resources.section.fields.capacity_required"),
                    minValue(1, "resources.section.fields.capacity_min")
                ]}
            />
        </SimpleForm>
    </Edit>
);

export const SectionCreate: React.FC<CreateProps> = (props) => (
    <Create {...props} title="resources.section.name">
        <SimpleForm>
            <TextInput
                source="name"
                label="resources.section.fields.name"
                validate={required("resources.section.fields.name_required")}
            />
            <NumberInput
                source="capacity"
                label="resources.section.fields.capacity"
                validate={[
                    required("resources.section.fields.capacity_required"),
                    minValue(1, "resources.section.fields.capacity_min")
                ]}
            />
        </SimpleForm>
    </Create>
);

export const SectionShow: React.FC<ShowProps> = (props) => (
    <Show {...props} title="resources.section.name">
        <SimpleShowLayout>
            <TextField source="id" label="resources.section.fields.id" />
            <TextField source="name" label="resources.section.fields.name" />
            <NumberField source="capacity" label="resources.section.fields.capacity" />
        </SimpleShowLayout>
    </Show>
);

export const sectionResource: ResourceProps = {
    name: "sections",
    list: SectionList,
    edit: SectionEdit,
    create: SectionCreate,
    show: SectionShow,
    options: { label: "resources.section.name" },
};

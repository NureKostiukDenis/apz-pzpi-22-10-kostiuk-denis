
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
    <List {...props} title="resources.gates.name">
        <Datagrid>
            <TextField source="id" label="resources.gate.fields.id" />
            <TextField source="code" label="resources.gate.fields.code" />
            <TextField source="type" label="resources.gate.fields.type" />
            <TextField source="sectionId" label="resources.gate.fields.sectionId" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const GateEdit: React.FC<EditProps> = (props) => (
    <Edit {...props} title="Редагування воріт">
        <SimpleForm>
            <TextInput source="id" label="resources.gate.fields.id" disabled />
            <TextInput
                source="code"
                label="resources.gate.fields.code"
                validate={required("resources.gate.fields.code.required")}
            />
            <TextInput
                source="type"
                label="resources.gate.fields.type"
                validate={required("resources.gate.fields.type.required")}
            />
        </SimpleForm>
    </Edit>
);

export const GateCreate: React.FC<CreateProps> = (props) => (
    <Create {...props} title="resources.gate.name">
        <SimpleForm>
            <TextInput
                source="code"
                label="resources.gate.fields.code"
                validate={required("resources.gates.fields.code.required")}
            />
            <TextInput
                source="type"
                label="resources.gate.fields.type"
                validate={required("resources.gate.fields.type.required")}
            />
        </SimpleForm>
    </Create>
);

export const GateShow: React.FC<ShowProps> = (props) => (
    <Show {...props} title="resources.gates.name">
        <SimpleShowLayout>
            <TextField source="id" label="resources.gate.fields.id" />
            <TextField source="code" label="resources.gate.fields.code" />
            <TextField source="type" label="resources.gate.fields.type" />
            <TextField source="sectionId" label="resources.gate.fields.sectionId" />
        </SimpleShowLayout>
    </Show>
);

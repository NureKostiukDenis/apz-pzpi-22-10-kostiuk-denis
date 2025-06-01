import {
    List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    Edit,
    Show,
    SimpleShowLayout,
    required,
    useNotify,
    useRedirect,
    useRefresh,
    SelectInput,
    ReferenceInput,
    type EditProps,
    useGetList,
    FilterLiveSearch, FilterList, FilterListItem,
} from 'react-admin';
import {Card, CardContent, ListItemIcon} from "@mui/material";

interface ItemRecordUI {
    id: string;
    rfidTag: string;
    name: string;
    sectionName: string;
}

export const PostFilterSidebar = () => {
    const { data: sections, isLoading } = useGetList('section', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' },
    });

    const sectionChoices = sections?.map(section => ({
        id: section.name,
        name: section.name,
    })) ?? [];


    return ( <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
            <CardContent>
                <FilterLiveSearch label="Item search" source="name"/>
                <FilterList label="Section" icon={<ListItemIcon/>} >
                    {sectionChoices.map((item, _index) => (
                        <FilterListItem label={item.name} value={{sectionName: item.name}} />
                    ))}
                </FilterList>
            </CardContent>
        </Card>
    );
}

export const ItemList = () => (
    <List
        aside={<PostFilterSidebar/>}
        filters={[]}
        filterDefaultValues={[]}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="name" label="resources.item.fields.name" />
            <TextField source="rfidTag" label="RFID Tag" />
            <TextField source="sectionName" label="resources.item.fields.sectionName" />
        </Datagrid>
    </List>
);


export const ItemCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();


    return (
        <Create>
            <SimpleForm>
                <TextInput
                    source="rfidTag"
                    label="RFID Tag"
                    validate={[required()]}
                    fullWidth
                />
                <TextInput
                    source="name"
                    label="resources.item.fields.name"
                    validate={[required()]}
                    fullWidth
                />
            </SimpleForm>
        </Create>
    );
};

export const ItemEdit: React.FC<EditProps> = (props) => {
    return (
        <Edit
            {...props}
            transform={(data: any) => {
                const { representativeSectionId, ...rest } = data;
                const payload: any = {
                    ...rest,
                };
                if (representativeSectionId !== undefined) {
                    payload.sectionId = representativeSectionId;
                }
                return payload;
            }}
        >
            <SimpleForm>
                <TextInput source="id" label="ID" disabled fullWidth />
                <TextInput source="rfidTag" label="RFID Tag" fullWidth readOnly  />
                <TextInput
                    source="name"
                    label="Назва товару"
                    validate={[required()]}
                    fullWidth
                />

                <ReferenceInput
                    label="section"
                    source="representativeSectionId"
                    reference="section"
                    allowEmpty
                    fullWidth
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};

export const ItemShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="rfidTag" label="RFID Tag" />
            <TextField source="name" label="resources.item.fields.name" />
            <TextField source="sectionName" label="resources.item.fields.sectionName" />
        </SimpleShowLayout>
    </Show>
);
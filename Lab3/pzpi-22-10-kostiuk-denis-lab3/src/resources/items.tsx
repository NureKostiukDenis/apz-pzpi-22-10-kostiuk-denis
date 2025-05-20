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
        <Datagrid rowClick="edit">
            <TextField source="id" label="ID" />
            <TextField source="name" label="Название" />
            <TextField source="rfidTag" label="RFID тэг" />
            <TextField source="sectionName" label="Секция" />
        </Datagrid>
    </List>
);


export const ItemCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const onSuccess = (data: ItemRecordUI) => {
        notify(`Товар "${data.name}" успішно створено`, { type: 'success' });
        redirect('/item');
        refresh();
    };

    const onError = (error: any) => {
        notify(`Помилка створення товару: ${error.message || 'Невідома помилка'}`, { type: 'error' });
    };

    return (
        <Create mutationOptions={{ onSuccess, onError }}>
            <SimpleForm>
                <TextInput
                    source="rfidTag"
                    label="RFID Tag"
                    validate={[required()]}
                    fullWidth
                />
                <TextInput
                    source="name"
                    label="Назва товару"
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
            title="Редагування товару (Спрощена версія)"
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
                    label="Секція"
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
            <TextField source="name" label="Назва товару" />
            <TextField source="sectionName" label="Назва секції" />
        </SimpleShowLayout>
    </Show>
);

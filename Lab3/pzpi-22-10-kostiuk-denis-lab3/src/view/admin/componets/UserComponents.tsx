import React, { useState } from 'react';
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    ShowButton,
    DeleteButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    SelectInput,
    required,
    email,
    minLength,
    Show,
    SimpleShowLayout,
    useRecordContext,
    TopToolbar,
    CreateButton,
    ExportButton,
    useTranslate,
    useNotify,
    useRedirect,
} from 'react-admin';
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Box, Typography } from '@mui/material';

const baseRoleChoices = [
    { id: 'USER', nameKey: 'roles.user' },
    { id: 'STAFF', nameKey: 'roles.staff' },
    { id: 'ADMIN', nameKey: 'roles.admin' },
];

const baseIdentifierTypeChoices = [
    { id: 'EMAIL', nameKey: 'identifierTypes.email' },
    { id: 'UID', nameKey: 'identifierTypes.firebaseUid' },
];

const UserListActions = () => {
    const translate = useTranslate();
    return (
        <TopToolbar>
            {/* CreateButton та ExportButton зазвичай використовують власні переклади з ra.action */}
            <CreateButton label={translate('ra.action.create')} />
            <ExportButton label={translate('ra.action.export')} />
        </TopToolbar>
    );
};

export const UserList = () => {
    const translate = useTranslate();
    return (
        <List actions={<UserListActions />} title={translate('resources.user.name', { smart_count: 2 })}>
            <Datagrid rowClick="show">
                <TextField source="id" label={translate('resources.user.fields.id')} />
                <TextField source="name" label={translate('resources.user.fields.name')} />
                <EmailField source="email" label={translate('resources.user.fields.email')} />
                <TextField source="role" label={translate('resources.user.fields.role')} />
                <TextField source="uid" label={translate('resources.user.fields.firebaseUid')} />
                <EditButton label={translate('ra.action.edit')} />
                <ShowButton label={translate('ra.action.show')} />
                <DeleteButton
                    mutationMode="pessimistic"
                    label={translate('ra.action.delete')}
                    confirmTitle={translate('ra.message.delete_title', { name: translate('resources.user.name', { smart_count: 1 }).toLowerCase(), id: '%{id}' })}
                    confirmContent={translate('ra.message.delete_content')}
                />
            </Datagrid>
        </List>
    );
};

const UserTitle = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    const recordName = record ? record.name : '';
    // Використовуємо назву ресурсу з перекладів
    const resourceName = translate('resources.user.name', { smart_count: 1 });
    return <span>{resourceName} {record ? `"${recordName}"` : ''}</span>;
};

export const UserEdit = () => {
    const translate = useTranslate();
    const roleChoices = baseRoleChoices.map(choice => ({ ...choice, name: translate(choice.nameKey) }));

    return (
        <Edit title={<UserTitle />}>
            <SimpleForm>
                <TextInput source="id" disabled label={translate('resources.user.fields.id')} />
                <TextInput source="uid" disabled label={translate('resources.user.fields.firebaseUid')} />
                <TextInput source="name" validate={[required()]} label={translate('resources.user.fields.name')} fullWidth />
                <TextInput source="email" validate={[required(), email()]} label={translate('resources.user.fields.email')} fullWidth />
                <SelectInput
                    source="role"
                    choices={roleChoices}
                    validate={[required()]}
                    label={translate('resources.user.fields.role')}
                    fullWidth
                />
            </SimpleForm>
        </Edit>
    );
};


export const UserCreate = () => {
    const [mode, setMode] = useState<'NEW' | 'ASSIGN'>('NEW');
    const notify = useNotify();
    const redirect = useRedirect();
    const translate = useTranslate();

    const roleChoices = baseRoleChoices.map(choice => ({ ...choice, name: translate(choice.nameKey) }));
    const identifierTypeChoices = baseIdentifierTypeChoices.map(choice => ({ ...choice, name: translate(choice.nameKey) }));


    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.value as 'NEW' | 'ASSIGN');
    };

    const transformData = (data: any) => {
        if (mode === 'NEW') {
            return {
                mode: 'NEW',
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            };
        } else {
            return {
                mode: 'ASSIGN',
                identifier: data.identifier,
                identifierType: data.identifierType,
            };
        }
    };

    const handleSuccess = (data: any) => {
        const messageKey = mode === 'NEW' ? 'notifications.userCreated' : 'notifications.userAssigned';
        notify(translate(messageKey), { type: 'success' });
        redirect('list', 'user');
    };

    const handleError = (error: any) => {
        const defaultMessageKey = mode === 'NEW' ? 'notifications.createUserError' : 'notifications.assignUserError';
        notify(
            translate('notifications.errorPrefix', { message: error.message || translate(defaultMessageKey) }),
            { type: 'error' }
        );
    };

    return (
        <Create
            title={translate('resources.user.actions.createUserPageTitle')}
            transform={transformData}
            mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
        >
            <SimpleForm>
                <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }}>
                    <FormLabel component="legend" sx={{ mb: 1 }}>{translate('resources.user.fields.operationType')}</FormLabel>
                    <RadioGroup row name="creationModeInternal" value={mode} onChange={handleModeChange}>
                        <FormControlLabel value="NEW" control={<Radio />} label={translate('resources.user.actions.createNewUser')} />
                        <FormControlLabel value="ASSIGN" control={<Radio />} label={translate('resources.user.actions.assignExistingUser')} />
                    </RadioGroup>
                </FormControl>

                {mode === 'NEW' && (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>{translate('resources.user.texts.newUserDetails')}</Typography>
                        <TextInput source="name" validate={[required()]} label={translate('resources.user.fields.name')} fullWidth resettable />
                        <TextInput source="email" validate={[required(), email()]} label={translate('resources.user.fields.email')} fullWidth resettable />
                        <PasswordInput source="password" validate={[required(), minLength(6)]} label={translate('resources.user.fields.password')} fullWidth resettable />
                        <SelectInput
                            source="role"
                            choices={roleChoices}
                            validate={[required()]}
                            defaultValue="STAFF"
                            label={translate('resources.user.fields.role')}
                            fullWidth
                            resettable
                        />
                    </Box>
                )}

                {mode === 'ASSIGN' && (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>{translate('resources.user.texts.assignUserDetails')}</Typography>
                        <SelectInput
                            source="identifierType"
                            choices={identifierTypeChoices}
                            validate={[required()]}
                            label={translate('resources.user.fields.identifierType')}
                            defaultValue="EMAIL"
                            fullWidth
                            resettable
                        />
                        <TextInput source="identifier" validate={[required()]} label={translate('resources.user.fields.identifier')} fullWidth resettable />
                    </Box>
                )}
            </SimpleForm>
        </Create>
    );
};

export const UserShow = () => {
    const translate = useTranslate();
    return (
        <Show title={<UserTitle />}>
            <SimpleShowLayout>
                <TextField source="id" label={translate('resources.user.fields.id')} />
                <TextField source="uid" label={translate('resources.user.fields.firebaseUid')} />
                <TextField source="name" label={translate('resources.user.fields.name')} />
                <EmailField source="email" label={translate('resources.user.fields.email')} />
                <TextField source="role" label={translate('resources.user.fields.role')} />
            </SimpleShowLayout>
        </Show>
    );
};
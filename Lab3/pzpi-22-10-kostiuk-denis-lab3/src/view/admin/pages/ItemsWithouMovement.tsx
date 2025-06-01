import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import {
    SimpleForm,
    NumberInput,
    Toolbar,
    SaveButton,
    useNotify,
    useTranslate,
} from 'react-admin';
import { useState } from 'react';
import { reportService, type ItemsWithoutMovementResponse } from '../../../data/services/reportService';
import { format, parseISO } from 'date-fns';

export const ItemsWithoutMovementPage = () => {
    const [data, setData] = useState<ItemsWithoutMovementResponse | null>(null);
    const notify = useNotify();
    const translate = useTranslate();

    const onSubmit = async (values: any) => {
        try {
            const response = await reportService.getItemsWithoutMovement(values.days, values.size);
            setData(response);
        } catch (error) {
            console.error(error);
            notify(translate('custom.itemsWithoutMovement.error'), { type: 'error' });
        }
    };

    const checkTime = (date: string | undefined) => {
        try {
            return date ? format(parseISO(date), 'dd.MM.yyyy HH:mm') : translate('custom.common.notAvailable');
        } catch (error) {
            console.error(error);
            return translate('custom.common.notAvailable');
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                {translate('custom.itemsWithoutMovement.title')}
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar><SaveButton label={translate('custom.itemsWithoutMovement.refresh')} /></Toolbar>}>
                        <NumberInput source="days" label={translate('custom.itemsWithoutMovement.days')} defaultValue={0} fullWidth />
                        <NumberInput source="size" label={translate('custom.itemsWithoutMovement.limit')} defaultValue={0} fullWidth />
                    </SimpleForm>
                </CardContent>
            </Card>

            {data && data.items && data.items.length > 0 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            {translate('custom.itemsWithoutMovement.found', { count: data.total })}
                        </Typography>
                        <Grid container spacing={2}>
                            {data.items.map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" component="div" gutterBottom sx={{ fontWeight: 'medium' }}>
                                                📦 {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                {translate('custom.itemsWithoutMovement.lastMovement')}: {checkTime(item.lastMovementDate)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {translate('custom.itemsWithoutMovement.location')}: {item.location?.sectionTitle || translate('custom.common.notAvailable')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {data && data.items.length === 0 && (
                <Typography color="text.secondary">
                    {translate('custom.itemsWithoutMovement.noItems')}
                </Typography>
            )}
        </Box>
    );
};

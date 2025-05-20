import {
    Box,
    Card,
    CardContent, Grid,
    Typography,
} from '@mui/material';
import {
    SimpleForm,
    NumberInput,
    Toolbar,
    SaveButton,
    useNotify,
} from 'react-admin';
import { useState } from 'react';
import { reportService, type ItemsWithoutMovementResponse } from '../../../data/services/reportService';
import {format, parseISO} from "date-fns";

export const ItemsWithoutMovementPage = () => {
    const [data, setData] = useState<ItemsWithoutMovementResponse | null>(null);
    const notify = useNotify();

    const onSubmit = async (values: any) => {
        try {
            const response = await reportService.getItemsWithoutMovement(values.days, values.size);
            setData(response);
        } catch (error) {
            console.error(error);
            notify('Помилка при завантаженні звіту безрухомих товарів', { type: 'error' });
        }
    };

    const checkTime = (date: string | undefined) => {
        try {
            return date ? format(parseISO(date), 'dd.MM.yyyy HH:mm') : 'N/A'
        }catch (error) {
            console.error(error);
            return 'N/A';
        }
    }

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Товари без руху</Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar><SaveButton label="Оновити" /></Toolbar>}>
                        <NumberInput source="days" label="Кількість днів" defaultValue={0} fullWidth />
                        <NumberInput source="size" label="Кількість товарів" defaultValue={0} fullWidth />
                    </SimpleForm>
                </CardContent>
            </Card>

            {data && data.items && data.items.length > 0 && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            Знайдено: {data.total} товарів
                        </Typography>
                        <Grid container spacing={2}>
                            {data.items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} >
                                    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" component="div" gutterBottom sx={{ fontWeight: 'medium' }}>
                                                📦 {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Останній рух: {checkTime(item.lastMovementDate)}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Місце: {item.location?.sectionTitle || 'N/A'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>)
            }

            {data && data.items.length === 0 && (
                <Typography color="text.secondary">Жодного товару не знайдено за вказаними критеріями.</Typography>
            )}
        </Box>
    );
};

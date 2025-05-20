import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import {
    SimpleForm,
    DateTimeInput,
    useNotify,
    Toolbar,
    SaveButton,
} from 'react-admin';
import { useState } from 'react';
import { reportService } from "../../../data/services/reportService";
import { type PeakActivityResponse } from "../../../data/services/reportService";

export const PeakActivityHoursPage = () => {
    const [data, setData] = useState<PeakActivityResponse | null>(null);
    const notify = useNotify();

    const onSubmit = async (values: any) => {
        try {
            const response = await reportService.getPeakActivityHours({
                startDate: values.startDate,
                endDate: values.endDate,
            });
            setData(response);
        } catch (error) {
            console.error(error);
            notify('Помилка при отриманні пікової активності', { type: 'error' });
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>Години пікової активності</Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar><SaveButton label="Пошук" /></Toolbar>}>
                        <DateTimeInput source="startDate" label="Початкова дата" fullWidth />
                        <DateTimeInput source="endDate" label="Кінцева дата" fullWidth />
                    </SimpleForm>
                </CardContent>
            </Card>

            {data && (
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            📍 Склад: {data.warehouse}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Загальна кількість активностей: {data.total}
                        </Typography>

                        <Grid container spacing={2}>
                            {data.dailyActivities.map((day, i) => (
                                <Grid item xs={12} key={i}>
                                    <Card variant="outlined" sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">{day.day}</Typography>
                                            {day.peakHours.map((h, j) => (
                                                <Typography key={j}>
                                                    Година {h.hour}: {h.activityCount} рухів
                                                </Typography>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

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
    useTranslate,
} from 'react-admin';
import { useState } from 'react';
import { reportService } from "../../../data/services/reportService";
import { type PeakActivityResponse } from "../../../data/services/reportService";

export const PeakActivityHoursPage = () => {
    const [data, setData] = useState<PeakActivityResponse | null>(null);
    const notify = useNotify();
    const translate = useTranslate();

    const onSubmit = async (values: any) => {
        try {
            const response = await reportService.getPeakActivityHours({
                startDate: values.startDate,
                endDate: values.endDate,
            });
            setData(response);
        } catch (error) {
            console.error(error);
            notify(translate('custom.peakActivity.error'), { type: 'error' });
        }
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                {translate('custom.peakActivity.title')}
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar><SaveButton label={translate('custom.peakActivity.search')} /></Toolbar>}>
                        <DateTimeInput source="startDate" label={translate('custom.peakActivity.start')} fullWidth />
                        <DateTimeInput source="endDate" label={translate('custom.peakActivity.end')} fullWidth />
                    </SimpleForm>
                </CardContent>
            </Card>

            {data && (
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            📍 {translate('custom.peakActivity.warehouse')}: {data.warehouse}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {translate('custom.peakActivity.total')}: {data.total}
                        </Typography>

                        <Grid container spacing={2}>
                            {data.dailyActivities.map((day, i) => (
                                <Grid item xs={12} key={i}>
                                    <Card variant="outlined" sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">{day.day}</Typography>
                                            {day.peakHours.map((h, j) => (
                                                <Typography key={j}>
                                                    {translate('custom.peakActivity.hour', { hour: h.hour, count: h.activityCount })}
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

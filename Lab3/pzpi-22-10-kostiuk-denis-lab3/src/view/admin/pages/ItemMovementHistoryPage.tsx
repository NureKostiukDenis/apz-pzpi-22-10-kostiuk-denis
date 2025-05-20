import {
    Box, Card, CardContent,
    Typography, Grid
} from '@mui/material';
import { useState } from 'react';
import {AutocompleteInput, DateTimeInput, SaveButton, SimpleForm, Toolbar, useGetList, useNotify} from 'react-admin';
import { format } from 'date-fns';
import {
    type ItemMovementHistoryRequest,
    type ItemMovementHistoryResponse,
    reportService
} from "../../../data/services/reportService.ts";

const ItemMovementHistoryPage = () => {
    const [result, setResult] = useState<ItemMovementHistoryResponse | null>(null);
    const notify = useNotify();

    const { data: items, isLoading, error } = useGetList('item', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' },
    });

    const onSubmit = async (values: any) => {
        try {
            const request: ItemMovementHistoryRequest = {
                itemRfidTag: values.itemRfidTag,
                endDate: values.endDate,
                startDate: values.startDate
            }
            const response = await reportService.getItemMovementHistory(request);
            setResult(response);
        } catch (e) {
            console.error(e);
            notify('Помилка при отриманні історії переміщень', { type: 'error' });
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Історія переміщень товару
            </Typography>

            <Card sx={{ mb: 3}}>
                <CardContent>
                    <SimpleForm onSubmit={onSubmit} toolbar={<Toolbar><SaveButton label="Показати" /></Toolbar>}>
                        <AutocompleteInput
                            source="itemRfidTag"
                            label="Предмет (RFID)"
                            choices={items || []}
                            optionText="name"
                            optionValue="rfidTag"
                            isLoading={isLoading}
                            fullWidth
                            helperText={error ? 'Помилка при завантаженні предметів' : undefined}
                        />
                        <DateTimeInput
                            source="startDate"
                            label="Початкова дата"
                            fullWidth
                        />
                        <DateTimeInput
                            source="endDate"
                            label="Кінцева дата"
                            fullWidth
                        />
                    </SimpleForm>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            📦 {result.name} ({result.itemRfidTag})
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Переміщень: {result.total}
                        </Typography>

                        <Grid container spacing={2}>
                            {result.movements.map((m, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Typography>
                                                <strong>Дата:</strong> {format(new Date(m.date), 'yyyy-MM-dd HH:mm')}
                                            </Typography>
                                            <Typography>
                                                <strong>З:</strong> {m.from.sectionTitle}
                                            </Typography>
                                            <Typography>
                                                <strong>До:</strong> {m.to.sectionTitle}
                                            </Typography>
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

export default ItemMovementHistoryPage;

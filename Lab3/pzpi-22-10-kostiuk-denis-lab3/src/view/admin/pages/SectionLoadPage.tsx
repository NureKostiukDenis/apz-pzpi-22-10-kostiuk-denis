import { useEffect, useState } from 'react';
import {
    Box, Card, CardContent, LinearProgress, Typography, Grid
} from '@mui/material';
import { useNotify, useTranslate } from 'react-admin';
import { reportService } from '../../../data/services/reportService.ts';

type SectionInfo = {
    name: string;
    currentLoad: number;
    capacity: number;
};

type ResponseData = {
    status: string;
    warehouseName: string;
    total: number;
    sections: SectionInfo[];
};

const SectionLoadPage = () => {
    const [data, setData] = useState<ResponseData | null>(null);
    const notify = useNotify();
    const translate = useTranslate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await reportService.getSectionLoad();
                setData(response);
            } catch (error) {
                notify(translate('custom.sectionLoad.error'), { type: 'error' });
                console.error(error);
            }
        };

        fetchData();
    }, [notify, translate]);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {translate('custom.sectionLoad.title')}
            </Typography>

            {data && (
                <>
                    <Typography variant="h6" gutterBottom color="primary">
                        🏭 {translate('custom.sectionLoad.warehouse')}: {data.warehouseName} | {translate('custom.sectionLoad.sections')}: {data.total}
                    </Typography>

                    <Grid container spacing={2}>
                        {data.sections.map((section, index) => {
                            const percent = Math.round((section.currentLoad / section.capacity) * 100);
                            return (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{section.name}</Typography>
                                            <Typography variant="body2">
                                                {section.currentLoad} / {section.capacity}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={percent}
                                                sx={{ mt: 1 }}
                                            />
                                            <Typography variant="caption">
                                                {percent}% {translate('custom.sectionLoad.load')}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default SectionLoadPage;

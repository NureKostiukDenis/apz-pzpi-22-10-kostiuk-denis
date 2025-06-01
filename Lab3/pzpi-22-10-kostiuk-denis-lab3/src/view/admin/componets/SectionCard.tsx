import {
    Card, CardContent, Typography, Collapse, IconButton, Box, Dialog, DialogTitle,
    DialogContent, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import type { Gate, Item, Section } from "../pages/SectionMap.tsx";
import { gateService } from "../../../data/services/gateService.ts";
import { useNotify, useTranslate } from "react-admin";

type Props = {
    section: Section;
    sectionItems: Item[];
    sectionGates: Gate[];
    allGates: Gate[];
    isOpen: boolean;
    toggleSection: (id: number) => void;
    onGateUpdate: (updatedGate: Gate, removed?: boolean) => void;
};

export const SectionCard = ({
                                section,
                                sectionItems,
                                sectionGates,
                                allGates,
                                isOpen,
                                toggleSection,
                                onGateUpdate,
                            }: Props) => {
    const [gateManagerOpen, setGateManagerOpen] = useState(false);
    const [selectedGateId, setSelectedGateId] = useState('');
    const [selectedConnectionType, setSelectedConnectionType] = useState('');
    const notify = useNotify();
    const translate = useTranslate();

    const handleAttachGate = async () => {
        if (!selectedGateId || !selectedConnectionType) {
            notify(translate('custom.sectionCard.selectGateWarning'), { type: 'warning' });
            return;
        }

        try {
            await gateService.attachToSection(Number(selectedGateId), {
                sectionId: section.id,
                connectionType: selectedConnectionType
            });

            const attachedGate = allGates.find(gate => gate.id === Number(selectedGateId));
            if (attachedGate) {
                onGateUpdate({
                    ...attachedGate,
                    sectionId: section.id,
                    type: selectedConnectionType,
                });
            }

            notify(translate('custom.sectionCard.attachSuccess'));
            setGateManagerOpen(false);
            setSelectedGateId('');
            setSelectedConnectionType('');
        } catch (e) {
            console.log(e);
            notify(translate('custom.sectionCard.attachError'), { type: 'error' });
        }
    };

    const handleDetachGate = async (gateId: number) => {
        try {
            await gateService.detachFromSection(gateId, { sectionId: section.id });

            const detachedGate = sectionGates.find(gate => gate.id === gateId);
            if (detachedGate) {
                onGateUpdate({
                    ...detachedGate,
                    sectionId: undefined
                }, true);
            }

            notify(translate('custom.sectionCard.detachSuccess'));
        } catch (e) {
            console.log(e);
            notify(translate('custom.sectionCard.detachError'), { type: 'error' });
        }
    };

    return (
        <>
            <Card key={section.id} sx={{ width: 340 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color={"primary"}>{section.name}</Typography>
                        <Box>
                            <IconButton onClick={() => toggleSection(section.id)}>
                                <ExpandMoreIcon />
                            </IconButton>
                            <IconButton onClick={() => setGateManagerOpen(true)}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={isOpen} sx={{ mt: 2 }}>
                        <Typography variant="h6" mt={2}>{translate('custom.sectionCard.items')}</Typography>
                        <Grid container spacing={1}>
                            {sectionItems.map(item => (
                                <Grid item xs={12} key={item.id}>
                                    <Card variant="outlined" sx={{ p: 1 }}>
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="body2">{item.name}</Typography>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Typography variant="h6" mt={2}>{translate('custom.sectionCard.gates')}</Typography>
                        <Grid container spacing={1}>
                            {sectionGates
                                .filter(gate => gate.sectionId === section.id)
                                .map(gate => (
                                    <Grid item xs={12} key={gate.id}>
                                        <Card variant="outlined" sx={{ p: 1 }}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography variant="body2">
                                                    {gate.code} ({gate.type})
                                                </Typography>
                                                <Button size="small" color="error" onClick={() => handleDetachGate(gate.id)}>
                                                    {translate('custom.sectionCard.detach')}
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Collapse>
                </CardContent>
            </Card>

            <Dialog open={gateManagerOpen} onClose={() => setGateManagerOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{translate('custom.sectionCard.dialogTitle')}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-gate-label">{translate('custom.sectionCard.selectGate')}</InputLabel>
                        <Select
                            labelId="select-gate-label"
                            value={selectedGateId}
                            onChange={(e) => setSelectedGateId(e.target.value)}
                            label={translate('custom.sectionCard.selectGate')}
                        >
                            {allGates
                                .filter(gate => gate.sectionId == undefined || gate.type == undefined)
                                .map(gate => (
                                    <MenuItem value={gate.id} key={gate.id}>
                                        {gate.code}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label={translate('custom.sectionCard.connectionType')}
                        value={selectedConnectionType}
                        onChange={(e) => setSelectedConnectionType(e.target.value)}
                        margin="normal"
                    />

                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleAttachGate}>
                            {translate('custom.sectionCard.attach')}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

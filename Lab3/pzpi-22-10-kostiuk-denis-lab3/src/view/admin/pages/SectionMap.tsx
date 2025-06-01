import { useDataProvider, useTranslate, useNotify } from 'react-admin';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { SectionCard } from '../componets/SectionCard.tsx';

export type Section = {
    id: number;
    name: string;
    capacity: number;
};

export type Item = {
    id: number;
    name: string;
    sectionName: string;
};

export type Gate = {
    id: number;
    code: string;
    type: string | undefined;
    warehouseId: number;
    sectionId: number | undefined;
};

const SectionMap = () => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const notify = useNotify();

    const [sections, setSections] = useState<Section[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [gates, setGates] = useState<Gate[]>([]);
    const [openSectionIds, setOpenSectionIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        Promise.all([
            dataProvider.getList('section', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} }),
            dataProvider.getList('item', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} }),
            dataProvider.getList('gate', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} }),
        ])
            .then(([sectionRes, itemRes, gateRes]) => {
                setSections(sectionRes.data);
                setItems(itemRes.data);
                setGates(gateRes.data);
            })
            .catch(() => {
                notify(translate('custom.sectionMap.error'), { type: 'error' });
            });
    }, [dataProvider, notify, translate]);

    const handleGateUpdate = (sectionId: number) => (updatedGate: Gate, removed = false) => {
        setGates(prevGates => {
            if (removed) {
                return prevGates.map(g => g.id === updatedGate.id ? { ...g, sectionId: undefined } : g);
            } else {
                return prevGates.map(g =>
                    g.id === updatedGate.id ? { ...g, sectionId: sectionId, type: updatedGate.type } : g
                );
            }
        });
    };

    const toggleSection = (id: number) => {
        setOpenSectionIds(prev => {
            const copy = new Set(prev);
            if (copy.has(id)) copy.delete(id);
            else copy.add(id);
            return copy;
        });
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {sections.map(section => (
                <SectionCard
                    key={section.id}
                    section={section}
                    sectionItems={items.filter(i => i.sectionName === section.name)}
                    sectionGates={gates.filter(g => g.sectionId === section.id)}
                    allGates={gates}
                    isOpen={openSectionIds.has(section.id)}
                    toggleSection={toggleSection}
                    onGateUpdate={handleGateUpdate(section.id)}
                />
            ))}
        </Box>
    );
};

export default SectionMap;

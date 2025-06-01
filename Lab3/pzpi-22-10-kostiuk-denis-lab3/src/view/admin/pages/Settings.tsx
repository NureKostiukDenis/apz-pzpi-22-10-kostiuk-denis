import { useLocale, useSetLocale, useTranslate, Title, useNotify } from 'react-admin';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    type SelectChangeEvent
} from '@mui/material';
import BackupIcon from '@mui/icons-material/Backup';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import DescriptionIcon from '@mui/icons-material/Description';
import {downloadDataBackup} from "../../../data/services/adminService.ts";

interface Language {
    locale: string;
    name: string;
}

const availableLanguages: Language[] = [
    { locale: 'en', name: 'English' },
    { locale: 'ua', name: 'Українська' },
];

export const Settings = () => {
    const locale = useLocale();
    const setLocale = useSetLocale();
    const translate = useTranslate();
    const notify = useNotify();

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        const newLocale = event.target.value;
        if (locale !== newLocale) {
            setLocale(newLocale);
            notify(translate('settings.notifications.languageChanged', { lang: availableLanguages.find(l => l.locale === newLocale)?.name || newLocale }), { type: 'info' });
        }
    };

    // Функції-заглушки для дій
    const handleBackupSettings = () => {
        console.log('Attempting to backup settings...');
        notify(translate('custom.settings.notifications.backupSettings.started'), { type: 'info' });
    };

    const handleBackupData = async () => {
        notify(translate('settings.notifications.backupData.started'), { type: 'info' });
        try {
            await downloadDataBackup();
            notify(translate('settings.notifications.backupData.successDownload'), { type: 'success' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            notify(translate('settings.notifications.backupData.errorDownload', { error: errorMessage }), { type: 'error' });
            console.error("Backup download failed:", error);
        }
    };

    const handleExportSettings = () => {
        console.log('Attempting to export settings...');
        notify(translate('custom.settings.notifications.exportSettings.started'), { type: 'info' });
    };

    const handleImportSettingsFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Importing settings file:', file.name);
            notify(translate('settings.notifications.importSettings.fileSelected', { fileName: file.name }), { type: 'info' });
            event.target.value = '';
        }
    };

    const handleExportData = () => {
        console.log('Attempting to export data...');
        notify(translate('custom.settings.notifications.exportData.started'), { type: 'info' });
    };

    const handleImportDataFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Importing data file:', file.name);
            notify(translate('settings.notifications.importData.fileSelected', { fileName: file.name }), { type: 'info' });
            event.target.value = '';
        }
    };

    return (
        <Card sx={{ marginTop: 2 }}>
            <Title title={translate('custom.settings.pageTitle')} />
            <CardHeader title={translate('custom.settings.pageTitle')} />
            <CardContent>
                {/* Секція зміни мови */}
                <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                        <LanguageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {translate('custom.settings.language.title')}
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="language-select-label">{translate('custom.settings.language.selectLabel')}</InputLabel>
                        <Select
                            labelId="language-select-label"
                            value={locale}
                            label={translate('custom.settings.language.selectLabel')}
                            onChange={handleLanguageChange}
                        >
                            {availableLanguages.map((lang) => (
                                <MenuItem key={lang.locale} value={lang.locale}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="caption" display="block" mt={1}>
                        {translate('custom.settings.language.currentLanguage')}: {availableLanguages.find(l => l.locale === locale)?.name || locale}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box mb={3}>
                    <Typography variant="h6" gutterBottom>
                        <SettingsBackupRestoreIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {translate('custom.settings.backup.title')}
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            variant="contained"
                            onClick={handleBackupData}
                            startIcon={<BackupIcon />}
                        >
                            {translate('custom.settings.backup.backupDataButton')}
                        </Button>
                    </Stack>
                    <Typography variant="caption" display="block" mt={1}>
                    </Typography>
                </Box>


                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="h6" gutterBottom>
                        <DescriptionIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        {translate('custom.settings.dataEI.title')}
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={handleExportData}
                            startIcon={<DownloadIcon />}
                        >
                            {translate('custom.settings.dataEI.exportButton')}
                        </Button>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadFileIcon />}
                        >
                            {translate('custom.settings.dataEI.importButton')}
                            <input type="file" accept=".csv, .json, .xml" hidden onChange={handleImportDataFile} />
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};
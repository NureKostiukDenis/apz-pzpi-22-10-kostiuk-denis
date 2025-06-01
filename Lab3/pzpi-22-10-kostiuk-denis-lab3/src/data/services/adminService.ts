import {API_URL, getAdminHeaders} from "../utils.ts";

function getFilenameFromContentDisposition(disposition: string | null): string | null {
    if (!disposition) {
        return null;
    }

    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
        let filename = matches[1].replace(/['"]/g, '');
        try {
            filename = decodeURIComponent(filename);
        } catch (e) {
        }
        return filename;
    }
    return null;
}

export const downloadDataBackup = async (): Promise<void> => {
    const headers = await getAdminHeaders(); // Отримуємо заголовки (включаючи Authorization, ApiKey)

    try {
        const response = await fetch(`${API_URL}/backup/data`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json(); // Ваш бекенд повертає { message: "..." }
                if (errorData && typeof errorData.message === 'string') {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                console.warn('Could not parse error response as JSON for backup download.', e);
            }
            throw new Error(errorMessage);
        }

        const disposition = response.headers.get('Content-Disposition');
        const filename = getFilenameFromContentDisposition(disposition) || `backup-${new Date().toISOString()}.sql`;

        const blob = await response.blob();

        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        if (link.parentNode) {
            link.parentNode.removeChild(link);
        }
        window.URL.revokeObjectURL(downloadUrl);


    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Failed to download data backup:', errorMessage);
        throw new Error(errorMessage);
    }
};
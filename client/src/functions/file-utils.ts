const FILE_SIZE_FACTOR = 1024;
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB'];

export function downloadFile(data: BlobPart, filename: string): void {
    const blob = new Blob([data]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function getFileSizeWithUnit(size: number): { size: number, unit: string } {
    for(const unit of FILE_SIZE_UNITS) {
        if(size < FILE_SIZE_FACTOR) {
            return {size, unit};
        }

        size /= FILE_SIZE_FACTOR;
    }

    return {size, unit: 'TB'};
}
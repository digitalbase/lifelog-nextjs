export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

export function formatDateShort(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
        timeZone: 'UTC',
    });
}

export interface GoogleBooksResponse {
    totalItems: number;
    items?: GoogleBookItem[];
}

export interface GoogleBookItem {
    id: string;
    volumeInfo: GoogleVolumeInfo;
}

export interface GoogleVolumeInfo {
    title?: string;
    authors?: string[];
}

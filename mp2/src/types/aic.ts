export interface Artwork {
    id: number;
    title: string;
    artist_title?: string | null;
    date_display?: string | null;
    date_start?: number | null;
    image_id?: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        total_pages: number;
        current_page: number;
        next_url: string | null;
    };
}
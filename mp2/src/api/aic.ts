import axios from "axios";
import {Artwork, PaginatedResponse } from "../types/aic";

const aic = axios.create({
    baseURL: "https://api.artic.edu/api/v1",
    timeout: 12000,
});

export async function fetchArtworks(page = 1, limit = 40) {
    const fields = [
        "id",
        "title",
        "artist_title",
        "date_display",
        "date_start",
        "image_id",
    ].join(",");
    const res = await aic.get<PaginatedResponse<Artwork>>("/artworks", {
        params: {page, limit, fields, },
    });
    return res.data;
}

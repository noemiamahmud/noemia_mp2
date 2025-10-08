import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { fetchArtworks } from "../api/aic";
import { Artwork } from "../types/aic";
import "./DetailView.css";

const DetailView: React.FC = () => {
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();
    const [items, setItems] = useState<Artwork[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const load = async () => {
            const p1 = await fetchArtworks(1, 50);
            const p2 = await fetchArtworks(2, 50);
            const all = [...(p1.data || []), ...(p2.data || [])];
            setItems(all);

            const idx = all.findIndex((a) => String(a.id) === id);
            setCurrentIndex(idx >= 0 ? idx: 0);
        };
        load();
    },[id]);

    if (items.length === 0) return <p>Loading...</p>;

    const artwork = items[currentIndex];
    if (!artwork) return <p>Artwork not found.</p>;

    const goPrev = () => {
        if (currentIndex > 0) {
            const prevId = items[currentIndex - 1].id;
            navigate(`/detail/${prevId}`);
        }
    };
    const goNext = () => {
        if (currentIndex < items.length - 1) {
            const nextId = items[currentIndex + 1].id;
            navigate(`/detail/${nextId}`);
        }
    };

    return (
    <section className="detail">
        <h1 className="detail__title">{artwork.title}</h1>

        {artwork.image_id ? (
            <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
                alt={artwork.title}
                className="detail__img"
            />
        ) : (
            <div className="no-image">No Image Available - Sorry!</div>
        )}
        <div className="detail_info">
            <p><strong>Artist:</strong> {artwork.artist_title || "unknown"}</p>
            <p><strong>Date:</strong>{artwork.date_display || "N/A"}</p>
        </div>

        <div className="detail__buttons">
            <button onClick={goPrev} disabled={currentIndex === 0}>
                previous
            </button>
            <button
                onClick={goNext}
                disabled={currentIndex === items.length - 1}
            >
                Next 
            </button>
        </div>
    </section>
    );
};
export default DetailView;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchArtworks } from "../api/aic";
import {Artwork} from "../types/aic";
import "./GalleryView.css";

const GalleryView: React.FC = () => {
    const [items, setItems] = useState<Artwork[]>([]);
    const [artistFilter, setArtistFilter] = useState<string>("");
    const navigate = useNavigate();
    useEffect(() => {
        const load = async () => {
            const p1 = await fetchArtworks(1, 50);
            const p2 = await fetchArtworks(2, 50);
            
            setItems([...(p1.data || []), ...(p2.data || [])]);
        };
        load();
    }, []);

    const artists = Array.from(
        new Set(items.map((a) => a.artist_title).filter(Boolean))
    ).sort();

    const filtered =
    artistFilter === ""
        ? items
        : items.filter((a) => a.artist_title === artistFilter);
    return (
        <section className="gallery">
            <h1>Gallery View</h1>
            <div className="gallery__controls">
                <label htmlFor="artist">Filter by Artist: </label>
                <select
                    id="artist"
                    value={artistFilter}
                    onChange={(e) => setArtistFilter(e.target.value)}
                >
                <option value="">All Artists</option>
                {artists.map((artist) => (
                    <option key={artist ?? "unknown"} value={artist ?? ""}>
                        {artist}
                    </option>
                ))}
                </select>
            </div>

            <div className="gallery__grid">
  {filtered.map((a) => (
    <div
      key={a.id}
      className="gallery__item"
      onClick={() => navigate(`/detail/${a.id}`)}
    >
      {a.image_id ? (
        <>
          <img
                src={`https://www.artic.edu/iiif/2/${a.image_id}/full/200,/0/default.jpg`}
                    alt={a.title}
                    className="gallery__img"
                    />
                    <p className="gallery__caption">
                    <strong>{a.title}</strong>
                    {a.artist_title && ` — ${a.artist_title}`}
                    </p>
                    </>
                    ) : (
                    <div className="no-image">No Image Available - Sorry!</div>
                    )}
                    </div>
                ))}
            </div>
        </section>
    );
};
export default GalleryView;
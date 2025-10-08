import React, { useEffect, useMemo, useState } from "react";
import {fetchArtworks } from "../api/aic";
import {Artwork } from "../types/aic";
import "./ListView.css";
import { queryByLabelText } from "@testing-library/dom";

type SortKey = "title" | "date_start";

type SortOrder = "asc" | "desc";

const ListView: React.FC = () => {
    const [items, setItems] = useState<Artwork[]>([]);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortKey>("title");
    const [order, setOrder] = useState<SortOrder>("asc");


    useEffect(() => {
        const load = async () => {
            const p1 = await fetchArtworks(1, 50);
            const p2 = await fetchArtworks(2, 50);

            setItems([...(p1.data || []), ...(p2.data || [])]);

        };
        load();
    }, []);

    const filteredAndSorted = useMemo(() => {

        const q = query.trim().toLowerCase();
        const filtered = q
            ? items.filter((a) =>
                [a.title, a.artist_title, a.date_display]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q.toLowerCase()))
            )
            : items;

        const dir = order === "asc" ? 1 : -1;
        const sorted = [...filtered].sort((a, b) => {
            const av = (a as any)[sortBy] ?? "";
            const bv = (b as any)[sortBy] ?? "";
            if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
            return String(av).localeCompare(String(bv)) * dir;
        });
        
        return sorted;
    }, [items, query, sortBy, order]);

    return (
        <section className="list">
            <h1 className="list__title">Art Institute of Chicago DataBase</h1>
                <h2>Search for artwork by name, title, or year!</h2>
            <div className="list_controls">
                <input
                    className="list_Search"
                    type="text"
                    value={query}
                    placeholder="Search"
                    onChange={(e) => setQuery(e.target.value)}
                />
                    <div className="list__sort">
                        <label>Sort by</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
                            <option value="title">Title</option>
                            <option value="date_start">Year</option>
                        </select>
                        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
                            {order === "asc" ? "Ascending" : "Descending"}
                        </button>
                    </div>
                </div>
            
            <ul className="list__results">
                {filteredAndSorted.map((a) => (
                    <li key={a.id} className="list__item">
                    <a href={`/detail/${a.id}`} className="list__link">
                        <strong>{a.title}</strong>
                        {a.artist_title && ` - ${a.artist_title}`}
                        {a.date_display && ` - ${a.date_display}`}
                    </a>
                  </li>
                ))}
            </ul>
         </section>
    );
};

export default ListView;

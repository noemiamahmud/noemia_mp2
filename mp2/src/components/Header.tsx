import React from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";

const Header: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/list">List of Art</Link></li>
                <li><Link to="/gallery">Gallery of Art</Link></li>
            </ul>
        </nav>
    );
};
export default Header;
import { useState, useEffect } from "react";
import MovieRow from "./Movierow";
import "./Menu_NewAndHot.css";

const Menu_NewAndHot = () => {
    const [newMovies, setNewMovies] = useState([]);

    const fetchNewMovies = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/movies/new");
            const data = await res.json();
            setNewMovies(data); 
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNewMovies();
    }, []);

    return (
        <div className="menu-main-new-and-hot">
            <MovieRow title="Mới trên netflix" movies={newMovies} />
        </div>
    );
};

export default Menu_NewAndHot;
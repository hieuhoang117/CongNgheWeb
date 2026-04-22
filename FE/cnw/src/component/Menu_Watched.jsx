import {useState} from "react";
import "./Menu_Watched.css";
import MovieItem from "./Movie_Iterm";

const Menu_Watched = () => {
    const [watchedItems, setWatchedItems] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchWatchedItems = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${userId}/watched`);
            const data = await res.json();
            setWatchedItems(data);
        } catch (err) {
            console.error(err);
        }
    };

    useState(() => {
        fetchWatchedItems();
    }, []);
    return (
        <div className="menu-watched">
                <h1 className="watched-title">Danh sách của tôi</h1>
            <div className="movie-list_genre">
                {watchedItems.map((watchedItem) => (
                    <div className="movie-card-wrapper" key={watchedItem.IDmovie}>
                        <MovieItem movie={watchedItem} />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Menu_Watched;
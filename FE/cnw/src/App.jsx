import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./component/banner1";
import AdminPage from "./AdminPage";
import AMMmovie from "./component/AM_movie";
import "antd/dist/reset.css";
import AMUser from "./component/AM_User";
import AMReport from "./component/AM_report";
import AMMseries from "./component/AM_series";
import UserPage from "./MainUser";
import MovieSlide from "./component/US_slide";
import MovieDetail from "./component/Movie_detail";


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movie")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Banner />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="users" element={<AMUser />} />
          <Route path="movies" element={<AMMmovie />} />
          <Route path="reports" element={<AMReport />} />
          <Route path="series" element={<AMMseries />} />
        </Route>

        <Route path="/user" element={<UserPage />}>
          <Route path="slide" element={<MovieSlide />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
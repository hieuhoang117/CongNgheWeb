import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Menumain from "./component/Menu_main";
import Moviedetail from "./component/Movie_detail";
import MoviePlay from "./component/MoviePlay";
import SeriesDetail from "./component/Series_Detail";
import EpisodePlay from "./component/EpisodePlay";  
import Menuseries from "./component/Menu_series";
import Menumocie from "./component/Menu_movie";
import AMnotifix from "./component/AM_notifi";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Banner />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route path="users" element={<AMUser />} />
          <Route path="movies" element={<AMMmovie />} />
          <Route path="reports" element={<AMReport />} />
          <Route path="series" element={<AMMseries />} />
          <Route path="notifix" element={<AMnotifix />} />
        </Route>

        <Route path="/user" element={<UserPage />}>
          <Route path="menu_main" element={<Menumain />} />
          <Route path="slide" element={<MovieSlide />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="movie/:id" element={<Moviedetail />} />
          <Route path="movie/:id/play" element={<MoviePlay />} />
          <Route path="series/:id" element={<SeriesDetail />} />
          <Route path="watch/:id" element={<EpisodePlay />} />
          <Route path="menu_series" element={<Menuseries />} />
          <Route path="menu_movie" element={<Menumocie />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
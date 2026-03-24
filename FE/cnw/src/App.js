import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./component/banner1";
import AdminPage from "./AdminPage";
import AM_movie from "./component/AM_movie";
import "antd/dist/reset.css";
import AM_User from "./component/AM_User";
import AM_Report from "./component/AM_report";

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
          <Route path="users" element={<AM_User />} />
          <Route path="movies" element={<AM_movie />} />
          <Route path="reports" element={<AM_Report />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./component/header1";
import Banner from "./component/banner1";
import AdminPage from "./AdminPage";
import "antd/dist/reset.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movie")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        

        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/" element={<Banner />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
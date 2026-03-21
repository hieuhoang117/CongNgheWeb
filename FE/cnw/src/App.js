import { useEffect, useState } from "react";
import Header from "./component/header1";
import Banner from "./component/banner1";
import "antd/dist/reset.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movie")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="App">
      {Header()}
      {Banner()}
    </div>
  );
}

export default App;
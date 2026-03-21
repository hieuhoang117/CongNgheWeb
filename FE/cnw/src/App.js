import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/movie")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Danh sách movie</h1>
      {users.map(u => (
        <p key={u.id}>{u.NameMovie}</p>
      ))}
    </div>
  );
}

export default App;
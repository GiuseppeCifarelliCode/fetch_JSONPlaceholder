import {useState, useEffect} from 'react';
import './App.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if(!response.ok) {
          throw new Error('Errore nella rete');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      })
  }, []);

  if(isLoading) {
    return <p>Caricamento in corso...</p>
  }

  if(error) {
    return <p>Errore: {error}</p>
  }

  return (
    <div>
      <h1>Lista Utenti:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.mail})</li>
        ))}
      </ul>
    </div>
  )
}
function App() {
  return <UserList></UserList>
}

export default App;

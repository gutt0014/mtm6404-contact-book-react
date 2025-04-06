import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import db from './utils/db';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './App.css';

export const App = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchContacts = async () => {
    try {
      const q = query(collection(db, "contacts"), orderBy("lastName", "asc"));
      const docSnapshot = await getDocs(q);
      const data = docSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="header-row">
        <h1>Contact Book</h1>
        <button className="add-button" onClick={() => navigate('/add')}>+</button>
      </div>

      <input className='search-input'
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <ul>
        {filteredContacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Link to={`/contact/view/${contact.id}`}>
                {`${contact.firstName} ${contact.lastName}`}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../utils/db';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'; 

const EditForm = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const fetchContact = async () => {
    try {
      const docRef = doc(db, 'contacts', id);  
      const docSnap = await getDoc(docRef);  

      if (docSnap.exists()) {
        setContact(docSnap.data());  
      } else {
        console.log("No such contact!");
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'contacts', id);
      await updateDoc(docRef, contact);  
      navigate(`/contact/view/${id}`);  
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, 'contacts', id);
      await deleteDoc(docRef); 
      navigate('/');  
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="form-container">
      <button onClick={() => navigate("/")} className="go-home-btn">&lt; Contacts</button>

      <h2 className='edit-h2'>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={contact.firstName}
            onChange={handleChange}
            required
            id="firstName"
            className="input-field"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={contact.lastName}
            onChange={handleChange}
            required
            id="lastName"
            className="input-field"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
            id="email"
            className="input-field"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={handleChange}
            required
            id="phoneNumber"
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">Save Changes</button>
        <button type="button" onClick={handleDelete} className="delete-btn">
            Delete Contact
        </button>
      </form>
    </div>
  );
};

export default EditForm;

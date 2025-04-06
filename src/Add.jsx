import { useState } from "react";
import db from "./utils/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactsCollection = collection(db, "contacts");

    try {
      const docRef = await addDoc(contactsCollection, formData);
      
      navigate(`/contact/view/${docRef.id}`);
    } catch (error) {
      console.log("Contact cannot be added", error);
      alert("There was an issue adding the contact. Please try again.");
    }
  };

  return (
    <>
      <button onClick={() => navigate("/")} className="go-home-btn">&lt; Contacts</button>
      <h1>Add New Contact</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Contact
        </button>
      </form>
    </>
  );
};

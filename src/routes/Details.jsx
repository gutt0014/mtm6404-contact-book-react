import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "../utils/db";
import { doc, getDoc } from "firebase/firestore";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        console.log("No such contact!");
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <> 
    <div className="buttons-container">
    <button
      onClick={() => navigate('/')}
      className="go-back-btn"
    >
      &lt; Contacts
    </button>
    <button
      onClick={() => navigate(`/contact/edit/${id}`)}
      className="edit-btn"
    >
      Edit
    </button>
  </div>
    <div className="contact-details">
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phoneNumber}</p>
    </div>
    </>
  );
};

export default ContactDetails;

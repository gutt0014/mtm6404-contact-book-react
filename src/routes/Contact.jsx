import { useState, useEffect } from "react";
import db from "../utils/db";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { EditForm } from "../components/EditForm";

export const Contact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({});

  const fetchContactById = async (contactId) => {
    const docRef = doc(db, "contacts", contactId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setContact({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      });
    } else {
      alert("Contact does not exist in our records!");
    }
  };

  const handleUpdate = async (updatedContact) => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, updatedContact);
      navigate("/");
    } catch (error) {
      alert("There was an issue. Please try again later.");
      console.error(error);
    }
  };

  const handleContactDelete = async () => {
    const msg = "Are you sure you want to delete?";
    try {
      if (confirm(msg)) {
        const docRef = doc(db, "contacts", id);
        await deleteDoc(docRef);
        setContact({});
        navigate("/");
      } else {
        navigate(0);
      }
    } catch (error) {
      alert("There was an issue. Please try again later.");
      console.error(error);
    }
  };

  const DeleteButton = () => (
    <button className="del-btn" onClick={handleContactDelete}>
      Delete Contact
    </button>
  );

  useEffect(() => {
    fetchContactById(id);
  }, [id]);

  return (
    <div className="contact">
      {contact && (
        <>
          <EditForm contact={contact} onUpdate={handleUpdate} />
          <DeleteButton />
        </>
      )}
    </div>
  );
};

export default Contact;

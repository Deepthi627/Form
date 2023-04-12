import React, { useState } from "react";
import * as Yup from "yup";
import "./Form.css";

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number")
    .required("Phone is required"),
});

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate({ name, email, phone }, { abortEarly: false });
      const newEntry = { name, email, phone };
      setEntries([...entries, newEntry]);
      setName("");
      setEmail("");
      setPhone("");
      setErrors({});
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  const handleEdit = (index) => {
    const entryToEdit = entries[index];
    setEntries(entries.filter((entry, i) => i !== index));
    setName(entryToEdit.name);
    setEmail(entryToEdit.email);
    setPhone(entryToEdit.phone);
  };

  const handleDelete = (index) => {
    setEntries(entries.filter((entry, i) => i !== index));
  };

  return (
    <div className="form-container">
      <div className="display-container">
        <h2 style={{ paddingLeft: "50px" , color:"blue"}}>Contact List</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              <p>
                <strong>Name:</strong> {entry.name}
              </p>
              <p>
                <strong>Email:</strong> {entry.email}
              </p>
              <p>
                <strong>Phone:</strong> {entry.phone}
              </p>
              <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
              <button  className="delete" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="form-wrapper">
        <h2 className="form-heading" style={{paddingLeft:"250px",color:"blue"}}>Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            { <span className="error">{errors.name}</span>}
          </div>
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {<span className="error">{errors.email}</span>}
          </div>
          <div className="form-field">
            <label>Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {<span className="error">{errors.phone}</span>}
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;

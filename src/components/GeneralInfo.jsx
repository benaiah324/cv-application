import { useState } from "react";
import "../styles/general.css";

function GeneralInfo({ data, setData }) {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="gen-section">
      <div className="gen-display">
        <h2>General Information</h2>

        {isEditing ? (
          <>
            <input
              name="name"
              placeholder="Fullname"
              value={data.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
            />

            <button onClick={() => setIsEditing(false)}>Submit</button>
          </>
        ) : (
          <>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>

            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default GeneralInfo;

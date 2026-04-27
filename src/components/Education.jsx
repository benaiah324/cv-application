import { useState } from "react";
import "../styles/education.css";

function Education({ data, setData }) {
  const [form, setForm] = useState({
    school: "",
    study: "",
    degree: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingId) {
      setData(
        data.map((item) =>
          item.id === editingId ? { ...form, id: editingId } : item,
        ),
      );

      setEditingId(null);
    } else {
      if (form.school.trim() && form.study.trim() && form.date.trim()) {
        setData([...data, { ...form, id: new Date().getTime().toString() }]);
        setIsVisible(true);
      }
    }

    setForm({ school: "", study: "", degree: "", date: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="edu-section">
      <div className="edu-display">
        <h2>Education</h2>

        <input
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="School"
          required
        />
        <input
          name="study"
          value={form.study}
          onChange={handleChange}
          placeholder="Course"
          required
        />
        <input
          name="degree"
          value={form.degree}
          onChange={handleChange}
          placeholder="Degree Obtained"
          required
        />
        <div className="edu">
          <input
            className="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            placeholder="Date"
            required
          />

          <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
        </div>

        <div className={isVisible ? "show" : "hide"}>
          {data?.map((item) => (
            <div key={item.id} className="list-item">
              <p>
                <strong>{item.school}</strong>
              </p>
              <p>{item.study}</p>
              <p>{item.degree}</p>
              <p>{item.date}</p>

              <div className="edu-btn">
                <button className="btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="btn"
                  id="del"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;

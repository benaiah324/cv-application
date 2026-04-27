import { useState } from "react";
import "../styles/experience.css";

function Experience({ data, setData }) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    to: "",
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
      if (
        form.company.trim() &&
        form.position.trim() &&
        form.responsibilities.trim()
      ) {
        setData([...data, { ...form, id: new Date().getTime().toString() }]);
        setIsVisible(true);
      }
    }

    setForm({
      company: "",
      position: "",
      responsibilities: "",
      from: "",
      to: "",
    });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="exp-section">
      <div className="exp-display">
        <h2>Experience</h2>

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <textarea
          name="responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          placeholder="Responsibilities"
        />
        <input
          type="date"
          name="from"
          value={form.from}
          onChange={handleChange}
          placeholder="From"
        />
        <input
          type="date"
          name="to"
          value={form.to}
          onChange={handleChange}
          placeholder="To"
        />

        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>

        <div className={isVisible ? "show" : "hide"}>
          {data?.map((item) => (
            <div key={item.id} className="list-item">
              <p>
                <strong>{item.company}</strong>
              </p>
              <p>{item.position}</p>
              <p>{item.responsibilities}</p>
              <p>
                {item.from} - {item.to}
              </p>

              <div className="exp-btn">
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

export default Experience;

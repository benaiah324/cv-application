import "../styles/preview.css";

function CVPreview({ general, education, experience }) {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>{general.name}</h1>
        <p>
          {general.email} | {general.phone}
        </p>
      </div>

      <div className="preview-section">
        <h3>Education</h3>
        {education?.map((edu) => (
          <div key={edu.id}>
            <strong>{edu.school}</strong>
            <p>{edu.study}</p>
            <p>{edu.degree}</p>
            <span>{edu.date}</span>
          </div>
        ))}
      </div>

      <div className="preview-section">
        <h3>Experience</h3>
        {experience?.map((exp) => (
          <div key={exp.id}>
            <strong>{exp.company}</strong>
            <p>{exp.position}</p>
            <p>{exp.responsibilities}</p>
            <span>
              {exp.from} - {exp.to}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CVPreview;

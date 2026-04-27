import { useState, useEffect, startTransition } from "react";
import GeneralInfo from "./components/GeneralInfo.jsx";
import Education from "./components/Education.jsx";
import Experience from "./components/Experience.jsx";
import CVPreview from "./components/CVPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [general, setGeneral] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [educationList, setEducationList] = useState([]);
  const [experienceList, setExperienceList] = useState([]);

  useEffect(() => {
    localStorage.setItem(
      "cvData",
      JSON.stringify({
        general,
        educationList,
        experienceList,
      }),
    );
  }, [general, educationList, experienceList]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cvData"));
    if (saved) {
      startTransition(() => {
        setGeneral(saved.general || { name: "", email: "", phone: "" });
        setEducationList(saved.educationList || []);
        setExperienceList(saved.experienceList || []);
      });
    }
  }, []);

  return (
    <div className="app-container">
      <h1>CV Builder</h1>

      <GeneralInfo data={general} setData={setGeneral} />
      <Education data={educationList} setData={setEducationList} />
      <Experience data={experienceList} setData={setExperienceList} />

      <CVPreview
        general={general}
        education={educationList}
        experience={experienceList}
      />
      <button onClick={downloadPDF}>Download CV</button>
    </div>
  );
}

const downloadPDF = () => {
  const input = document.querySelector(".preview-container");

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("cv.pdf");
  });
};

export default App;

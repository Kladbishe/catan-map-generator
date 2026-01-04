import { useTranslation } from "react-i18next";
import "./Rules.css";

const pdfFiles: Record<string, string> = {
  en: "/assets/rules/manual_en.pdf",
  ru: "/assets/rules/manual_ru.pdf",
  he: "/assets/rules/manual_he.pdf",
};

export default function Rules() {
  const { i18n } = useTranslation();
  const lang: string = i18n.language;
  const pdfToShow: string = pdfFiles[lang] || pdfFiles["en"];

  return (
    <div className="Rules">
      <iframe
        src={pdfToShow}
        className="Rules-frame"
        title="Rules PDF"
        style={{ width: "100%", height: "80vh", border: "none" }}
      ></iframe>

      <div className="Rules-buttons">
        <a href={pdfToShow} download>
          <button className="Rules-btn">Download PDF</button>
        </a>
        <button
          className="Rules-btn"
          onClick={() => window.open(pdfToShow, "_blank")}
        >
          Print PDF
        </button>
      </div>
    </div>
  );
}

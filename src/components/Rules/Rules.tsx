import { useTranslation } from "react-i18next";
import "./Rules.css";

export default function Rules() {
  const { i18n, t } = useTranslation();
  const lang: string = i18n.language;
  const baseUrl = import.meta.env.BASE_URL;

  const pdfFiles: Record<string, string> = {
    en: `${baseUrl}assets/rules/manual_en.pdf`,
    ru: `${baseUrl}assets/rules/manual_ru.pdf`,
    he: `${baseUrl}assets/rules/manual_he.pdf`,
  };

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
          <button className="Rules-btn">{t("rules.downloadPdf")}</button>
        </a>
        <button
          className="Rules-btn"
          onClick={() => window.open(pdfToShow, "_blank")}
        >
          {t("rules.printPdf")}
        </button>
      </div>
    </div>
  );
}

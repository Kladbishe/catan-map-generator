import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Rules.css";

export default function Rules() {
  const { i18n, t } = useTranslation();
  const lang: string = i18n.language;
  const baseUrl = import.meta.env.BASE_URL;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  const pdfFiles: Record<string, string> = {
    en: `${baseUrl}assets/rules/manual_en.pdf`,
    ru: `${baseUrl}assets/rules/manual_ru.pdf`,
    he: `${baseUrl}assets/rules/manual_he.pdf`,
  };

  const pdfToShow: string = pdfFiles[lang] || pdfFiles["en"];

  return (
    <div className="Rules catan-bg">
      {isMobile ? (
        <div className="Rules-mobile-message">
          <div className="Rules-icon">📄</div>
          <h2 className="rtl-text">{t("rules.mobileTitle")}</h2>
          <p className="rtl-text">{t("rules.mobileMessage")}</p>
        </div>
      ) : (
        <div className="Rules-iframe-container">
          <iframe
            src={`${pdfToShow}#toolbar=1&navpanes=0&scrollbar=1`}
            className="Rules-frame"
            title="Rules PDF"
          />
        </div>
      )}

      <div className="Rules-buttons">
        <a href={pdfToShow} target="_blank" rel="noopener noreferrer">
          <button className="Rules-btn btn">
            {t("rules.openPdf")}
          </button>
        </a>
        <a href={pdfToShow} download>
          <button className="Rules-btn btn">
            {t("rules.downloadPdf")}
          </button>
        </a>
      </div>
    </div>
  );
}

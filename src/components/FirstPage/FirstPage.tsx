import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./firstPage.css";

export default function FirstPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="FirstPage">
      <div className="content">
        <button className="generate-btn">{t("firstPage.generateMap")}</button>
      </div>

      <div className="bottom-buttons">
        <button onClick={() => navigate("/rules")}>{t("firstPage.rules")}</button>
        <button>{t("firstPage.setup")}</button>
      </div>
    </div>
  );
}

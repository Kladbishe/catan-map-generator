import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./firstPage.css";
import { Carousel } from "../common/Carousel/Carousel";

export default function FirstPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL;
  const versionSelector =[
    { id: '1', title: t("firstPage.games.basic.titleCarousel"),subtitle: t("firstPage.games.basic.subtitle"),description: t("firstPage.games.basic.description") ,img: `${baseUrl}assets/versionGame/bases-1-4.webp` },
    { id: '2', title: t("firstPage.games.basicStandardExtension.titleCarousel"),subtitle: t("firstPage.games.basicStandardExtension.subtitle"),description: t("firstPage.games.basicStandardExtension.description"), img: `${baseUrl}assets/versionGame/bases+players5-6.webp` },
    { id: '3', title: t("firstPage.games.seafarers.titleCarousel"),subtitle: t("firstPage.games.seafarers.subtitle"),description: t("firstPage.games.seafarers.description"), img: `${baseUrl}assets/versionGame/bases-1-4.webp` },
    { id: '4', title: t("firstPage.games.seafarersExtension.titleCarousel"),subtitle: t("firstPage.games.seafarersExtension.subtitle"),description: t("firstPage.games.seafarersExtension.description"), img: `${baseUrl}assets/versionGame/bases-1-4.webp` }

  ]


  const mapSlides = versionSelector.map(map => (
    <div className="map-card" key={map.id}>
      <img
        src={map.img}
        alt={map.title}
        style={{ width: '85%', borderRadius: '12px' }}
      />
      <h3>{map.title}</h3>
      <h5>{map.subtitle}</h5>
      <p>{map.description}</p>
    </div>
  ));
  
  return (
    <div className="FirstPage">
      <div className="Carousel">
        <Carousel slides={mapSlides} />
      </div>
      <div className="content">
        <button className="generate-btn" onClick={() => navigate("/generatorMap")}>{t("firstPage.generateMap")}</button>
      </div>

      <div className="bottom-buttons">
        <button onClick={() => navigate("/rules")}>{t("firstPage.rules")}</button>
        <button>{t("firstPage.setup")}</button>
      </div>
    </div>
  );
}

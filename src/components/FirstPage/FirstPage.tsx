import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./firstPage.css";
import { Carousel } from "../common/Carousel/Carousel";

export default function FirstPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const baseUrl = import.meta.env.BASE_URL;

  const versionSelector = [
    { id: 'classic', mapKey: 'classic', title: t("firstPage.games.basic.titleCarousel"), subtitle: t("firstPage.games.basic.subtitle"), description: t("firstPage.games.basic.description"), img: `${baseUrl}assets/versionGame/bases-1-4.webp` },
    { id: 'classicExtension', mapKey: 'classicExtension', title: t("firstPage.games.basicStandardExtension.titleCarousel"), subtitle: t("firstPage.games.basicStandardExtension.subtitle"), description: t("firstPage.games.basicStandardExtension.description"), img: `${baseUrl}assets/versionGame/bases+players5-6.webp` },
    { id: 'seafarers', mapKey: 'seafarers', title: t("firstPage.games.seafarers.titleCarousel"), subtitle: t("firstPage.games.seafarers.subtitle"), description: t("firstPage.games.seafarers.description"), img: `${baseUrl}assets/versionGame/bases-1-4.webp` },
    { id: 'seafarersExtension', mapKey: 'seafarersExtension', title: t("firstPage.games.seafarersExtension.titleCarousel"), subtitle: t("firstPage.games.seafarersExtension.subtitle"), description: t("firstPage.games.seafarersExtension.description"), img: `${baseUrl}assets/versionGame/bases-1-4.webp` }
  ]

  const [selectedMapIndex, setSelectedMapIndex] = useState(0)


  const mapSlides = versionSelector.map(map => (
    <div className="map-card" key={map.id}>
      <img
        src={map.img}
        alt={map.title}
        style={{ width: '85%', borderRadius: '12px' }}
      />
      <h3 className="rtl-text">{map.title}</h3>
      <h5 className="rtl-text">{map.subtitle}</h5>
      <p className="rtl-text">{map.description}</p>
    </div>
  ));
  
  const handleGenerateMap = () => {
    const selectedMap = versionSelector[selectedMapIndex]
    navigate("/generatorMap", { state: { mapType: selectedMap.mapKey } })
  }

  return (
    <div className="FirstPage catan-bg">
      <div className="Carousel">
        <Carousel slides={mapSlides} onSlideChange={setSelectedMapIndex} />
      </div>
      <div className="content">
        <button className="generate-btn btn" onClick={handleGenerateMap}>{t("firstPage.generateMap")}</button>
      </div>

      <div className="bottom-buttons">
        <button className="btn" onClick={() => navigate("/rules")}>{t("firstPage.rules")}</button>
        <button className="btn">{t("firstPage.setup")}</button>
      </div>
    </div>
  );
}

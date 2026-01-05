import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./firstPage.css";
import { Carousel } from "../common/Carousel/Carousel";

export default function FirstPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const versionSelector =[
    { id: '1', title: t("firstPage.titleCarousel"), img: '/public/assets/versionGame/bases-1-4.webp' },
    { id: '2', title: t("firstPage.titleCarousel"), img: '/public/assets/versionGame/bases+players5-6.webp' },
    { id: '3', title: t("firstPage.titleCarousel"), img: '/public/assets/versionGame/bases-1-4.webp' }
  ]


  const mapSlides = versionSelector.map(map => (
    <div className="map-card" key={map.id}>
      <img 
        src={map.img} 
        alt={map.title} 
        style={{ width: '100%', borderRadius: '12px' }} 
      />
      <h3>{map.title}</h3>
    </div>
  ));
  
  return (
    <div className="FirstPage">
      <div className="Carousel">
        <Carousel slides={mapSlides} />
      </div>
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

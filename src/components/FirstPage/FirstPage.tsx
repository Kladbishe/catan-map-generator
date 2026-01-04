import { useNavigate } from "react-router-dom";
import "./firstPage.css";

export default function FirstPage() {
  const navigate = useNavigate();

  return (
    <div className="FirstPage">
      <div className="content">
        <button className="generate-btn">Generate Map</button>
      </div>

      <div className="bottom-buttons">
        <button onClick={() => navigate("/rules")}>Rules</button>
        <button>Setup</button>
      </div>
    </div>
  );
}

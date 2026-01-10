import { Navigate, Route, Routes } from "react-router-dom";
import Rules from "../../Rules/Rules"
import NotFound from "../not-found/NotFound";
import FirstPage from "../../FirstPage/FirstPage";
import GeneratorMap from "../../generatorMap/GeneratorMap";


export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<FirstPage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/generatorMap" element={<GeneratorMap />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

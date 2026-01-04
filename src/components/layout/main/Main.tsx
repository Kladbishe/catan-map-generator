import { Navigate, Route, Routes } from "react-router-dom";
import Rules from "../../Rules/Rules"
import NotFound from "../not-found/NotFound";
import FirstPage from "../../FirstPage/FirstPage";


export default function Main() {
    return (
        <Routes>
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/" element={<Navigate to="/firstPage" />} />
            <Route path="/firstPage" element={<FirstPage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

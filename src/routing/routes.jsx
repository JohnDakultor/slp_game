import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import LandingPage from "../components/LandingPage";
import JungleGame from "../games/screen/boardGame/jungleLand";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/jungleGame" element={<JungleGame />} />
            </Routes>
        </BrowserRouter>
    );
}
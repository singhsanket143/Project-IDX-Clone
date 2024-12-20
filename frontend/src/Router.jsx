import { Route, Routes } from "react-router-dom"
import { ProjectPlayground } from "./pages/ProjectPlayground"
import LandingPage from "./pages/LandingPage"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element = {<LandingPage />} />
            <Route path="/project/:projectId" element={<ProjectPlayground />} />
        </Routes>
    )
}
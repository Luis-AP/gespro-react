import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login/Login";
import ProfessorDashboard from "../pages/ProfessorDashboard/ProfessorDashboard";

const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <h1>Welcome to GesPro React!</h1>,
            },
            {
                path: "activities",
                element: <ProfessorDashboard />,
            },
            {
                path: "projects",
                element: <div>Lista de Proyectos</div>,
            },
        ],
    },
    {
        element: <Layout />,
        children: [
            {
                path: "*",
                element: <h1>404 Not Found</h1>,
            },
        ],
    },
]);

export default Router;

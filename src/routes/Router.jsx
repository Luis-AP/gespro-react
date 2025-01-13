import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
// Importar las páginas

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <h1>Welcome to GesPro React!</h1>,
            },
            {
                path: "activities",
                element: (
                    <ProtectedRoute>
                        <div>Lista de Actividades</div>
                    </ProtectedRoute>
                ),
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

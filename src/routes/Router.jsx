import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
// Importar las páginas

const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <h1>Welcome to GesPro React!</h1>,
            },
        ],
    },
    {
        path: "*",
        element: <>404 - Not Found</>,
    },
]);

export default Router;

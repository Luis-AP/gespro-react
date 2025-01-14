import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "./Layout";
import Login from "../pages/Login/Login";
import ProfessorDashboard from "../pages/ProfessorDashboard/ProfessorDashboard";
import { ProtectedRoute, ProfessorRoute, StudentRoute } from "@/routes/ProtectedRoute";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/activities" replace />} />
                <Route
                    path="activities"
                    element={
                        <ProfessorRoute>
                            <ProfessorDashboard />
                        </ProfessorRoute>
                    }
                />
                <Route
                    path="projects"
                    element={
                        <StudentRoute>
                            <div>Lista de Proyectos</div>
                        </StudentRoute>
                    }
                />
            </Route>

            <Route path="*" element={<Layout />}>
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Route>
        </Route>
    )
);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;
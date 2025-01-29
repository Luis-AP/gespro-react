import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "./Layout";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ProfessorDashboard from "../pages/ProfessorDashboard/ProfessorDashboard";
import {
    ProtectedRoute,
    ProfessorRoute,
    StudentRoute,
} from "@/routes/ProtectedRoute";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import StudentProjects from "../pages/Projects/StudentProjects";
import ProfessorProjects from "../pages/Projects/ProfessorProjects";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />

            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="activities">
                    <Route
                        path="student"
                        element={
                            <StudentRoute>
                                <StudentDashboard />
                            </StudentRoute>
                        }
                    />
                    <Route
                        path="professor"
                        element={
                            <ProfessorRoute>
                                <ProfessorDashboard />
                            </ProfessorRoute>
                        }
                    />
                </Route>
                <Route path="projects">
                    <Route
                        path="student"
                        element={
                            <StudentRoute>
                                <StudentProjects />
                            </StudentRoute>
                        }
                    />
                    <Route
                        path="professor"
                        element={
                            <ProfessorRoute>
                                <ProfessorProjects />
                            </ProfessorRoute>
                        }
                    />
                </Route>
            </Route>

            {/* Ruta para manejar páginas no encontradas */}
            <Route path="*" element={<Layout />}>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Route>
    )
);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Layout from "./Layout";
import Login from "../pages/Login/Login";
import ProfessorDashboard from "../pages/ProfessorDashboard/ProfessorDashboard";
import {
    ProtectedRoute,
    ProfessorRoute,
    StudentRoute,
} from "@/routes/ProtectedRoute";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import StudentProjects from "../pages/Projects/StudentProjects";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProvider />}>
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
                                <div>Proyectos del Profesor</div>
                            </ProfessorRoute>
                        }
                    />
                </Route>
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

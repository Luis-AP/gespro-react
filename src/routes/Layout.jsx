import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";
// Importar las componentes generales de la aplicación

export default function Layout() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-gray-100">
                {/* Header */}
                <Header
                    items={[
                        { label: "Actividades", path: "/activities" },
                        { label: "Proyectos", path: "/projects" },
                    ]}
                />

                {/* Main Content */}
                <main className="flex-1 container mx-auto py-6 px-4">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </AuthProvider>
    );
}

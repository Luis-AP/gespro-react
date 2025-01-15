import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserMenu } from "../components/UserMenu";

export default function Layout() {
    const { state } = useAuth();
    const isProfessor = state?.user?.role === 'professor';

    const menuItems = isProfessor 
        ? [{ label: "Actividades", path: "/activities/professor" }, { label: "Proyectos", path: "/projects/professor" }]
        : [{ label: "Actividades", path: "/activities/student" }, { label: "Proyectos", path: "/projects/student" }];

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header
                items={menuItems}
                rightContent={<UserMenu />}
            />
            <main className="flex-1 container mx-auto py-6 px-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
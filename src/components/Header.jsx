import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header({ items }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-8 flex h-16 items-center justify-between max-w-[1400px] mx-auto">
                {/* Logo y Navegación */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6" />
                        <span className="font-bold text-xl hidden sm:inline">GesPro</span>
                    </Link>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex items-center gap-2">
                        {items.map((item) => (
                            <Button
                                key={item.path}
                                variant="ghost"
                                className="text-sm"
                                asChild
                            >
                                <Link to={item.path}>{item.label}</Link>
                            </Button>
                        ))}
                    </nav>
                </div>

                {/* Navegación Móvil */}
                <nav className="md:hidden flex items-center">
                    <div className="flex flex-wrap justify-end gap-3">
                        {items.map((item) => (
                            <Button
                                key={item.path}
                                variant="ghost"
                                size="sm"
                                className="text-sm h-8"
                                asChild
                            >
                                <Link to={item.path}>{item.label}</Link>
                            </Button>
                        ))}
                    </div>
                </nav>

                {/* User Menu */}
                <div className="flex items-center pl-4">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
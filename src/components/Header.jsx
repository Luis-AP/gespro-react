import { useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Header({ items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Container for logo, menu and desktop nav */}
                <div className="flex justify-between w-full lg:w-auto gap-6">
                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            className="text-gray-200 hover:text-gray-400 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex shrink-0 items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <img
                                alt="GesPro Logo"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden lg:flex space-x-6">
                        <ul className="flex space-x-4">
                            {items.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="hover:underline"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* UserProfile */}
                <UserProfile />
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <nav className="lg:hidden">
                    <ul className="flex flex-col space-y-4 p-4 text-black text-left">
                        {items.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="hover:underline"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}

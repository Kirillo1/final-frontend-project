import { NavLink, useLocation } from "react-router-dom";

/** Массив пунктов меню */
const navItems = [
    { name: "Главная", path: "/" },
    { name: "Смартфоны", path: "/smartphones" },
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
    const location = useLocation();

    /**
     * Определяет, активна ли ссылка.
     * @param {string} path - Путь ссылки.
     * @returns {boolean} ссылка активна или нет.
     */
    const isActiveLink = (path) => {
        return (
            location?.pathname === path ||
            (path === "/cards" && location?.pathname?.startsWith("/cards"))
        );
    };

    return (
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                    <nav className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <NavLink to="/" className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <img
                                className="hidden lg:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                alt="Workflow"
                            />
                        </NavLink>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {navItems?.map((item) => (
                                <NavLink
                                    to={item?.path}
                                    key={item?.path}
                                    className={`text-gray-600 inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item?.path)
                                        ? "text-indigo-500 border-b-2 border-indigo-500"
                                        : "hover:text-indigo-500"
                                        }`}
                                >
                                    {item?.name}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="bg-transparent p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg
                                fill="currentColor"
                                width="24"
                                height="24"
                                viewBox="0 0 32 32"
                                aria-hidden="true"
                            >
                                <path d="M17 24H21V28H17zM24 24H28V28H24zM17 17H21V21H17zM24 17H28V21H24z"></path>
                                <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2	H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

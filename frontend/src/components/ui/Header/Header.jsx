import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useForm from "../../../hooks/useForm";
import useRegistrationForm from '../../../hooks/userRegistrationForm';
import { Modal } from "../Modal/Modal";
import Input from "../Input/Input";
import { useAuth } from '../../../hooks/useAuth';
import useProductsStore from '../../../store/useProductsStore';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import HeadphonesBatteryRoundedIcon from '@mui/icons-material/HeadphonesBatteryRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'; 
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { useFavorites } from '../../../context/FavoriteContext';
import { useCartProducts } from '../../../context/CartContext';


/** Массив подпунктов меню добавления */
const products = [
    { 
        name: 'Смартфон', 
        description: 'Добавить смартфон', 
        href: 'add_new_product/smartphones', 
        icon: SmartphoneRoundedIcon 
    },
    { 
        name: 'Аксессуар', 
        description: 'Добавить аксессуар', 
        href: 'add_new_product/accessories', 
        icon: HeadphonesBatteryRoundedIcon 
    },
]

/** Массив пунктов меню */
const navItems = [
    { name: "Смартфоны", path: "products/smartphones" },
    { name: "Аксессуары", path: "products/accessories" },
    { name : "Панель администратора", path: "/admin_panel" },
    { name: "Мои товары", path: "/company_products" }
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
    // Стейт для показа/скрытия модального окна (для регистрации).
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Стейт для показа/скрытия модального окна (для входа).
    const [showLoginModal, setShowLoginModal] = useState(false);

    // Использование кастомного хука для обработки данных входа
    const { formValues, formErrors, handleInput, resetForm } = useForm({
        login: "",
        password: "",
    });

    // Использование кастомного хука для обработки данных регистрации
    const { registrationFormValues, registrationFormErrors, registrationHandleInput, registrationResetForm } = useRegistrationForm({
        login: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number:"",
        company_name: ""
    });

    const { user, onRegister, onLogin, onLogout } = useAuth();

    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    const { favorites } = useFavorites();
    const favoritesCount = favorites.smartphones.length + favorites.accessories.length;

    const { cartProducts } = useCartProducts();
    const cartProductsCount = cartProducts.smartphones.length + cartProducts.accessories.length;

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

    // Хук для навигации (роутинга) по страницам
    const navigate = useNavigate();
    
    const allErrorsAreNull = Object.values(registrationFormErrors).every(value => value === null);

    // Обработка формы при регистрации
    const handleRegisterForm = (event) => {

        if (allErrorsAreNull) {
            event.preventDefault();
    
            onRegister(registrationFormValues);
            setShowRegisterModal(false); // Закрываем Modal
            registrationResetForm(); // Сбрасываем форму
        }
    };

    // Обработка формы при входе в систему
    const handleLoginForm = (event) => {
        event.preventDefault();

        onLogin(formValues);
        setShowLoginModal(false); // Закрываем Modal
        resetForm(); // Сбрасываем форму
    };

    // Обработчик закрытия модального окна (регистрация)
    const closeRegisterModalAndResetForm = () => {
        setShowRegisterModal(false);
        resetForm(); // Сбрасываем форму
    };

    // Обработчик закрытия модального окна (логин)
    const closeLoginModalAndResetForm = () => {
        setShowLoginModal(false);
        resetForm(); // Сбрасываем форму
    };

    // Показ страницы с сохраненками
    const handleToOpenFavorites = () => {
        navigate(`/favorites`);
    };

    // Показ страницы корзина товаров
    const handleToCartOpen = () => {
        navigate(`/cart`);
    };

    return (
        <header className="bg-black shadow-lg shadow-violet-700">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <NavLink to="/" className="text-white text-xl flex-shrink-0 flex items-center">
                    MobileGuru
                </NavLink>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-wite"
                    >
                        <span className="sr-only">Открыть главное меню</span>
                        <MenuRoundedIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                {showRegisterModal && (
                    <Modal
                        title="Регистрация"
                        isOpen={showRegisterModal}
                        onClose={closeRegisterModalAndResetForm}
                    >
                        <form onSubmit={handleRegisterForm}
                            className="text-center"
                        >
                            <Input
                                label="Ваше имя"
                                name="first_name"
                                type="text"
                                value={registrationFormValues?.first_name}
                                onInput={registrationHandleInput}
                                placeholder="Имя"
                                error={registrationFormErrors?.first_name}
                                required
                            />
                            <Input
                                label="Ваша фамилия"
                                name="last_name"
                                type="text"
                                value={registrationFormValues?.last_name}
                                onInput={registrationHandleInput}
                                placeholder="Фамилия"
                                error={registrationFormErrors?.last_name}
                                required
                            />
                            <Input
                                label="Пароль"
                                type="password"
                                name="password"
                                value={registrationFormValues?.password}
                                onInput={registrationHandleInput}
                                placeholder="Пароль"
                                error={registrationFormErrors?.password}
                                required
                            />
                            <Input
                                label="Почта"
                                name="login"
                                type="email"
                                value={registrationFormValues?.email}
                                onInput={registrationHandleInput}
                                placeholder="Почта"
                                error={registrationFormErrors?.email}
                                required
                            />
                            <Input
                                label="Название магазина"
                                name="company_name"
                                type="text"
                                value={registrationFormValues?.company_name}
                                onInput={registrationHandleInput}
                                placeholder="Название компании"
                                error={registrationFormErrors?.company_name}
                                required
                            />
                            <Input
                                label="Номер телефона"
                                name="phone_number"
                                type="text"
                                value={registrationFormValues?.phone_number}
                                onInput={registrationHandleInput}
                                placeholder="Номер телефона"
                                error={registrationFormErrors?.phone_number}
                                required
                            />

                            <button
                                className="bg-violet-500 text-white font-medium py-2 px-4 rounded"
                                type="submit"
                                disabled={!allErrorsAreNull} 
                            >
                                Зарегистрироваться
                            </button>
                        </form>
                    </Modal>
                )}
                {showLoginModal && (
                    <Modal
                        title="Войти"
                        isOpen={showLoginModal}
                        onClose={closeLoginModalAndResetForm}
                    >
                        <form onSubmit={handleLoginForm}
                            className="text-center"
                        >
                            <Input
                                label="Ваша почта"
                                name="login"
                                type="email"
                                value={formValues?.email}
                                onInput={handleInput}
                                placeholder="Введите вашу почту"
                                // error={formErrors?.login}
                                required
                            />
                            <Input
                                label="Пароль"
                                type="password"
                                name="password"
                                value={formValues?.password}
                                onInput={handleInput}
                                placeholder="Введите ваш пароль"
                                error={formErrors?.password}
                                required
                            />
                            <button
                                className="bg-violet-500 text-white font-medium py-2 px-4 rounded"
                                type="submit"
                            >
                                Войти
                            </button>
                        </form>
                    </Modal>
                )}
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                        {navItems?.map((item) => {
                                // Скрыть пункт меню "Admin" если пользователь не администратор
                                if (
                                    item?.path === "/admin_panel" &&
                                    (!user || user?.role !== "admin")
                                ) {
                                    return null;
                                } 

                                if (
                                    item?.path === "/company_products" &&
                                    (!user || user?.role !== "company")
                                ) {
                                    return null;
                                }

                                return (
                            <NavLink
                                to={item?.path}
                                key={item?.path}
                                className={`text-white inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item?.path)
                                    ? "text-violet-700"
                                    : "hover:text-violet-500"
                                    }`}
                            >
                                {item?.name}
                            </NavLink>

                                )
                        })}
                        {user?.role === "company" && (
                        <Popover className="relative">
                            <PopoverButton className="text-white after:border-0 before:border-0 inline-flex items-center text-sm hover:text-violet-500">
                                Добавить
                                <KeyboardArrowDownRoundedIcon />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute border-solid border-2 border-violet-700 -left-8 top-full z-10 mt-6 w-screen max-w-md overflow-hidden rounded-3xl bg-black shadow-lg shadow-violet-700 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="p-4 ">
                                    {products.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg text-white border-violet-500 border-b-2 hover:border-b-4 p-4 text-sm leading-6"
                                        >
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg">
                                                <item.icon aria-hidden="true" className="h-6 w-6 group-hover:text-violet-500" />
                                            </div>
                                            <div className="flex-auto">
                                                <a href={item.href} className="block font-semibold text-white hover:text-violet-500">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>
                        )}
                    </div>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button
                        type="button"
                        className="relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500"
                        onClick={handleToOpenFavorites}
                    >
                        <FavoriteRoundedIcon />
                        {!!favoritesCount && (
                            <span
                                className="w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-violet-500 rounded-full absolute top-[-4px] right-[-4px]"
                            >
                                {favoritesCount}
                            </span>
                        )}
                    </button>
                    <button
                        type="button"
                        className='relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500'
                        onClick={handleToCartOpen}
                    >
                        <LocalMallRoundedIcon/>
                        {!!cartProductsCount && (
                            <span
                                className="w-5 h-5 text-xs px-1 leading-5 text-white inline-flex items-center justify-center bg-violet-500 rounded-full absolute top-[-4px] right-[-4px]"
                            >
                                {cartProductsCount}
                            </span>
                        )}
                    </button>
                    {!user ? (
                        <>
                            <button 
                                type='button'
                                onClick={() => setShowLoginModal(true)}
                                className="text-white inline-flex items-center px-2 pt-1 text-sm hover:text-violet-500e"
                            >
                                Войти
                            </button>
        
                            <button
                                type="button"
                                onClick={() => setShowRegisterModal(true)}
                                className="text-white inline-flex items-center px-2 pt-1 text-sm hover:text-violet-500e"
                            >
                                Регистрация <span className='ms-1'></span>
                            </button>
                        </>

                    ) : (
                        <button 
                            type='button' 
                            onClick={onLogout}
                            className="text-white inline-flex items-center px-1 pt-1 text-sm hover:text-violet-500e"
                        >
                            Выйти <ExitToAppRoundedIcon />
                        </button>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <NavLink to="/" className="text-white text-xl flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            MobileGuru
                        </NavLink>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Закрыть меню</span>
                            <CloseRoundedIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        <KeyboardArrowDownRoundedIcon />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Войти
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
};

export default Header;

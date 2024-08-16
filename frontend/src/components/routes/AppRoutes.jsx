import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import Home from "../../pages/Home.jsx";
import SmartphonesCards from "../../pages/SmartphonesCards.jsx";
import AccessoriesCards from "../../pages/AccessoriesCards.jsx";
import ProductCardDetail from "../../pages/ProductCardDetail.jsx";
import Admin from "../../pages/Admin.jsx";
import PrivateRoute from "./PrivateRoute";
import AddNewProduct from "../../pages/AddProduct.jsx";
import CompanyProduct from "../../pages/CompanyProducts.jsx";
import FavoritesList from "../../pages/FavoriteProducts.jsx";
import Cart from "../../pages/Cart.jsx";

/** Массив роутов приложения */
const routes = [
    { path: "/", element: <Home /> },
    { path: "smartphones", element: <SmartphonesCards /> },
    { path: "accessories", element: <AccessoriesCards /> },
    { path: "favorites", element: <FavoritesList /> },
    { path:"cart", element: <Cart /> },
    { path: "product_detail/:endpoint/:id", element: <ProductCardDetail /> },
    { path: "admin_panel", element: <PrivateRoute element={<Admin />} requiredRole="admin" /> },
    { path: "add_new_product", element: <PrivateRoute element={<AddNewProduct />} requiredRole="company" /> },
    { path: "company_products", element: <PrivateRoute element={<CompanyProduct />} requiredRole="company" /> }
];

/**
 * Рекурсивно отображает роуты и и дочерние роуты.
 * @param {RouteItem[]} routes - Массив роутов.
 * @returns {JSX.Element[]} Массив JSX элементов роутов.
 */
const renderRoutes = (routes) => {
    return routes.map((route) => (
        <Route key={route?.path} path={route?.path} element={route?.element}>
            {route?.children && renderRoutes(route.children)}
        </Route>
    ));
};

/** Корневой компонент приложения с роутами */
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            {renderRoutes(routes)}
        </Route>
    </Routes>
);

export default AppRoutes;

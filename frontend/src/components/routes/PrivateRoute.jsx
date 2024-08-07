import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Компонент для защищенного роута
 * @param {object} props - Свойства компонента
 * @param {JSX.Element} props.element - Компонент для отображения
 * @param {string} props.requiredRole - Роль для доступа к роуту
 * @returns {JSX.Element} - Компонент
 */
const PrivateRoute = ({ element, requiredRole }) => {
    // Получаем данные о пользователе и состояние загрузки из хука useAuth
    const { user, loading } = useAuth();

    if (loading) {
        // Пока данные загружаются, отображаем индикатор загрузки
        return <div>Loading...</div>;
    }

    if (requiredRole && user?.role !== requiredRole) {
        // Если роль пользователя не совпадает с требуемой, перенаправляем на домашнюю страницу
        return <Navigate to="/" />;
    }

    // Если все проверки пройдены, отображаем переданный компонент
    return element;
};

export default PrivateRoute;

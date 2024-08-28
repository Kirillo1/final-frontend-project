import { useState, useEffect } from "react";
// import useProductsStore from "../../../store/useProductsStore";

/**
 * Компонент увеличения/уменьшения количества товара.
 * @param {object} props - Свойства компонента.
 * @param {string} [props.minValue = 1] - Минимальное значение.
 * @param {string} [props.maxValue = 10] - Максимальное значение.
 * @param {number} [props.step = 1] - Шаг изменения значения.
 * @param {string} props.id - id элемента для увеличения/уменьшения (обязательный).
 * @param {function} props.onQuantityUpdate - Функция коллбек для передачи данных родителю.
 * @returns {JSX.Element} Элемент JSX.
 */
export const Stepper = ({ minValue = 1, maxValue = 10, step = 1, id }) => {
    // Стейт для увеличения/уменьшения значения в компоненте.
    const [value, setValue] = useState(minValue);

    // Получаем данные о корзине и функцию для обновления количества товара из стора.
    // const { cart, updateCartQuantity } = useProductsStore();

    // useEffect(() => {
    //     // Находим элемент с соответствующим id
    //     const cartItem = cart.find((item) => item?.id === id);

    //     // Если элемент найден, устанавливаем значение количества
    //     // Иначе устанавливаем минимальное значение
    //     if (cartItem) {
    //         setValue(cartItem?.quantity);
    //     } else {
    //         setValue(minValue);
    //     }
    // }, [cart, minValue, id]);

    /**
     * Обработчик увеличения значения
     */
    const handleBtnIncrement = () => {
        if (value + step <= maxValue) {
            const newValue = value + step;
            setValue(newValue);
            // updateCartQuantity(newValue, id);
        }
    };

    /**
     * Обработчик уменьшения значения
     */
    const handleBtnDecrement = () => {
        if (value - step >= minValue) {
            const newValue = value - step;
            setValue(newValue);
            // updateCartQuantity(newValue, id);
        }
    };

    return (
        <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded dark:bg-neutral-900 dark:border-neutral-700">
            <div className="flex items-center gap-x-1.5">
                <button
                    disabled={value === 1}
                    onClick={handleBtnDecrement}
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    tabIndex="-1"
                    aria-label="Decrease"
                >
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14"></path>
                    </svg>
                </button>

                <input
                    value={value}
                    min={minValue}
                    max={maxValue}
                    readOnly
                    className="p-0 w-7 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
                    style={{ MozAppearance: "textfield" }}
                    type="number"
                ></input>

                <button
                    onClick={handleBtnIncrement}
                    disabled={value === 10}
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    tabIndex="-1"
                >
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Stepper;

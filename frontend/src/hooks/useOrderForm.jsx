import { validateForm as validators } from "../utils/validators";
import { useState } from "react";

/**
 * Хук для управления обработки, обновления и отправки данных формы.
 *
 * @param {Object} initialValues - Начальное состояние формы (Объект).
 * @returns {formValues} - Объект с состоянием формы.
 * @returns {handleInputChange} - Функция обработчик при смене данных в инпуте.
 * @returns {resetForm} - Функция сброса состояния формы.
 */
export function useOrderForm(initialValues) {

    // Состояние формы, хранит значения полей регистрации
    const [orderFormValues, setOrderFormValues] = useState(initialValues);

    // Состояние для отслеживания ошибок валидации
    const [orderFormErrors, setFormErrors] = useState({});

        /**
     * Функция для валидации полей формы и обновления состояния ошибок.
     *
     * @param {string} name - Название поля.
     * @param {any} value - Значение поля.
     */
        const validateField = (name, value) => {
            console.log(name, value)
            const validationErrors = {
                ...orderFormErrors,
                [name]: validators({ [name]: value })[name] || null,
            };
            setFormErrors(validationErrors);
        };

    /**
     * Обработчик изменения значения полей формы.
     *
     * @param {Object} e - Событие изменения.
     */
    const orderHandleInput = (e) => {
        const { name, value, type } = e.target;

        // Обновляем состояние формы для текущего поля
        const updatedFormState = { ...orderFormValues, [name]: value };
        setOrderFormValues(updatedFormState);

        // Валидируем текущее поле
        validateField(name, value);
    }

    /**
     * Обработчик изменения значения файлов.
     *
     * @param {Object} e - Событие изменения.
     */
    const handleFileChange = (e) => {
        const { name, files } = e.target;

        // Обновляем состояние формы для текущего поля
        const updatedFormState = { ...formValues, [name]: files };
        setOrderFormValues(updatedFormState);

        // Валидируем файлы (если необходимо)
        validateField(name, files);

    };

    // Функция для сброса состояния формы и состояния ошибок
    const orderResetForm = () => {
        setOrderFormValues(initialValues);
        setFormErrors({});
    };

    return {
        orderFormValues,
        orderFormErrors,
        orderHandleInput,
        handleFileChange,
        orderResetForm
    };
}

export default useOrderForm;

import { validateForm } from "../utils/validators";
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
    const [formErrors, setFormErrors] = useState({});

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

        // Валидируем текущее поле по атрибуту type
        // const validationErrors = {
        //     ...formErrors,
        //     [name]: validateForm({ [type]: value })[type] || null,
        // };

        // Обновляем состояние ошибок
        // setFormErrors(validationErrors);
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
        setFormValues(updatedFormState);

        // Обновляем состояние ошибок, если нужно
        // const validationErrors = {
        //     ...formErrors,
        //     [name]: validateForm({ files })[type] || null,
        // };

        // setFormErrors(validationErrors);
    };

    // Функция для сброса состояния формы и состояния ошибок
    const orderResetForm = () => {
        setOrderFormValues(initialValues);
        setFormErrors({});
    };

    return {
        orderFormValues,
        formErrors,
        orderHandleInput,
        handleFileChange,
        orderResetForm
    };
}

export default useOrderForm;

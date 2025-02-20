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
export function useRegistrationForm(initialValues) {
    // Состояние формы, хранит значения полей регистрации
    const [registrationFormValues, setRegistrationFormValues] = useState(initialValues);

    // Состояние для отслеживания ошибок валидации
    const [registrationFormErrors, setFormErrors] = useState({});

    /**
     * Функция для валидации полей формы и обновления состояния ошибок.
     *
     * @param {string} name - Название поля.
     * @param {any} value - Значение поля.
     */
    const validateField = (name, value) => {
        const validationErrors = {
            ...registrationFormErrors,
            [name]: validators({ [name]: value })[name] || null,
        };
        setFormErrors(validationErrors);
    };

    /**
     * Обработчик изменения значения полей формы.
     *
     * @param {Object} e - Событие изменения.
     */
    const registrationHandleInput = (e) => {
        const { name, value } = e.target;

        // Обновляем состояние формы для текущего поля
        const updatedFormState = { ...registrationFormValues, [name]: value };
        setRegistrationFormValues(updatedFormState);

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
        const updatedFormState = { ...registrationFormValues, [name]: files };
        setRegistrationFormValues(updatedFormState);

        // Валидируем файлы (если необходимо)
        validateField(name, files);
    };

    // Функция для сброса состояния формы и состояния ошибок
    const registrationResetForm = () => {
        setRegistrationFormValues(initialValues);
        setFormErrors({});
    };

    return {
        registrationFormValues,
        registrationFormErrors,
        registrationHandleInput,
        handleFileChange,
        registrationResetForm
    };
}

export default useRegistrationForm;

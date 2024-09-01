const validators = {
    text: (value, maxLength) => {
        if (!value) return "Заполните поле";

        const regexText = /^[^!>?<_\-$№#@]+$/;

        if (!regexText.test(value))
            return "Текст не должен содержать символов !>?<_-$№#@.";

        if (maxLength && value.length > maxLength)
            return `Текст не должен превышать ${maxLength} символов`;

        return null;
    },
    email: (value) => {
        if (!value) return "Заполните поле";

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
            return "Некорректный email";

        return null;
    },
    phone: (value) => {
        console.log(value)
        if (!value) return "Заполните поле";

        if (!/^\+?[0-9-]+$/.test(value)) return "Некорректный номер телефона";

        return null;
    },
    password: (value) => {
        if (!value) return "Заполните поле";

        if (value.length < 8) return "Пароль должен быть не менее 8 символов";

        return null;
    },
    number: (value, min, max) => {
        if (value === undefined || value === null || value === '') return "Заполните поле";

        if (isNaN(value)) return "Вводите текст";

        if (min !== undefined && value < min) return `Значение должно быть больше ${min}`;
        if (max !== undefined && value > max) return `Значение должно быть меньше ${max}`;

        return null;
    },
};

export function validateForm(formData) {
    const validationErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
        switch (key) {
            case 'name':
            case 'phone_model':
            case 'processor':
                validationErrors[key] = validators.text(value, 200);
                break;
            case 'color':
            case 'guarantee':
            case 'manufacturer_country':
                validationErrors[key] = validators.text(value, 100);
                break;
            case 'description':
                validationErrors[key] = validators.text(value, 500);
                break;
            case 'ram_capacity':
                validationErrors[key] = validators.number(value, 1, 128);
                break;
            case 'memory_capacity':
                validationErrors[key] = validators.number(value, 1, 1024);
                break;
            case 'battery_capacity':
                validationErrors[key] = validators.number(value, 1000, 10000);
                break;
            case 'release_year':
                validationErrors[key] = validators.number(value, 2000, 2100);
                break;
            case 'quantity':
            case 'price':
                validationErrors[key] = validators.number(value, 0);
                break;
            case 'email':
                validationErrors[key] = validators.email(value);
                break;
            case 'phone_number':
                validationErrors[key] = validators.phone(value);
                break;
            case 'password':
                validationErrors[key] = validators.password(value);
                break;
            default:
                break;
        }
    });

    return validationErrors;
}

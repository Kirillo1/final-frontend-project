import React from "react";
import useForm from "../../../hooks/useForm";
import Input from "../Input/Input";
import { useAuth } from '../../../hooks/useAuth';

const Form = () => {
    const { formValues, formErrors, handleInput, handleFileChange } = useForm({
        name: '',
        phone_model: '',
        color: '',
        processor: '',
        ram_capacity: '',
        memory_capacity: '',
        battery_capacity: '',
        release_year: '',
        guarantee: '',
        manufacturer_country: '',
        description: '',
        quantity: '',
        price: '',
        images: []
    });

    const { user } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const files = event.target.images.files;
        const filesName = Array.from(files).map(file => file.name);

        const payload = {
            ...formValues,
            is_verified: true,
            images: filesName,
            user_id: user?.id
        };

        try {
            const response = await fetch('http://localhost:8080/smartphones/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            console.log("Server response:", result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <section className="add_product">
            <form
                onSubmit={handleSubmit}
                className="max-w-7xl mx-auto px-2 relative"
            >
                <div className="flex justify-around mb-5">
                    <Input
                        label="Название"
                        name="name"
                        type="text"
                        value={formValues.name}
                        onInput={handleInput}
                        error={formErrors.name}
                        required
                        className="w-80"
                    />
                    <Input
                        label="Модель"
                        name="phone_model"
                        type="text"
                        value={formValues.phone_model}
                        onInput={handleInput}
                        error={formErrors.phone_model}
                        required
                        className="w-80"
                    />
                </div>

                <div className="flex justify-around mb-5">
                    <Input
                        label="Цвет"
                        name="color"
                        type="text"
                        value={formValues.color}
                        onInput={handleInput}
                        error={formErrors.color}
                        required
                    />
                    <Input
                        label="Процессор"
                        name="processor"
                        type="text"
                        value={formValues.processor}
                        onInput={handleInput}
                        error={formErrors.processor}
                        required
                    />
                    <Input
                        label="Страна производства"
                        name="manufacturer_country"
                        type="text"
                        value={formValues.manufacturer_country}
                        onInput={handleInput}
                        error={formErrors.manufacturer_country}
                        required
                    />
                </div>

                <div className="flex justify-between mb-5">
                    <Input
                        label="Оперативная память"
                        name="ram_capacity"
                        type="number"
                        value={formValues.ram_capacity}
                        onInput={handleInput}
                        error={formErrors.ram_capacity}
                        required
                    />
                    <Input
                        label="Внутренняя память"
                        name="memory_capacity"
                        type="number"
                        value={formValues.memory_capacity}
                        onInput={handleInput}
                        error={formErrors.memory_capacity}
                        required
                    />
                    <Input
                        label="Емкость аккумулятора"
                        name="battery_capacity"
                        type="number"
                        value={formValues.battery_capacity}
                        onInput={handleInput}
                        error={formErrors.battery_capacity}
                        required
                    />
                    <Input
                        label="Год выпуска"
                        name="release_year"
                        type="number"
                        value={formValues.release_year}
                        onInput={handleInput}
                        error={formErrors.release_year}
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="images" className="text-gray-700 font-bold mb-2">Описание</label>
                <div className="flex justify-center mb-5 ">
                    <textarea
                        type="text"
                        name="description"
                        value={formValues.description}
                        onInput={handleInput}
                        error={formErrors.description}
                        required={true}
                        className="w-96 outline-none border-4 border-violet-800 p-2 rounded-md focus:border-violet-500 mb-1"
                    />
                </div>
                </div>

                <div className="flex justify-between mb-5">
                    <Input
                        label="Гарантия"
                        name="guarantee"
                        type="text"
                        value={formValues.guarantee}
                        onInput={handleInput}
                        error={formErrors.guarantee}
                        required
                    />
                    <Input
                        label="Количество"
                        name="quantity"
                        type="number"
                        value={formValues.quantity}
                        onInput={handleInput}
                        error={formErrors.quantity}
                        required
                    />
                    <Input
                        label="Цена"
                        name="price"
                        type="number"
                        value={formValues.price}
                        onInput={handleInput}
                        error={formErrors.price}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Изображения</label>
                    <input
                        id="images"
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="max-w-96 w-full border border-gray-300 p-2 rounded-md focus:outline-none mb-1"
                    />
                </div>

                <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                    Добавить
                </button>
            </form>
        </section>
    );
};

export default Form;

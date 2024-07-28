import React from "react";
import useForm from "../../../hooks/useForm";
import Input from "../Input/Input";

const Form = () => {
    const { formValues, formErrors, handleInput, handleFileChange } = useForm({
        name: '',
        model_phone: '',
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

    const handleSubmit = async (event) => {
        const files = event.target.images.files;
        console.log(files)
        event.preventDefault();

        const payload = {
            ...formValues,
            is_verified: true,
            images: ["ddd", "ddfff"]
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
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 p-6"
        >
            <Input
                label="name"
                name="name"
                type="text"
                value={formValues.name}
                onInput={handleInput}
                error={formErrors.name}
                required
            />
            <Input
                label="model_phone"
                name="model_phone"
                type="text"
                value={formValues.model_phone}
                onInput={handleInput}
                error={formErrors.model_phone}
                required
            />
            <Input
                label="color"
                name="color"
                type="text"
                value={formValues.color}
                onInput={handleInput}
                error={formErrors.color}
                required
            />
            <Input
                label="processor"
                name="processor"
                type="text"
                value={formValues.processor}
                onInput={handleInput}
                error={formErrors.processor}
                required
            />
            <Input
                label="ram_capacity"
                name="ram_capacity"
                type="number"
                value={formValues.ram_capacity}
                onInput={handleInput}
                error={formErrors.ram_capacity}
                required
            />
            <Input
                label="memory_capacity"
                name="memory_capacity"
                type="number"
                value={formValues.memory_capacity}
                onInput={handleInput}
                error={formErrors.memory_capacity}
                required
            />
            <Input
                label="battery_capacity"
                name="battery_capacity"
                type="number"
                value={formValues.battery_capacity}
                onInput={handleInput}
                error={formErrors.battery_capacity}
                required
            />
            <Input
                label="release_year"
                name="release_year"
                type="number"
                value={formValues.release_year}
                onInput={handleInput}
                error={formErrors.release_year}
                required
            />
            <Input
                label="guarantee"
                name="guarantee"
                type="text"
                value={formValues.guarantee}
                onInput={handleInput}
                error={formErrors.guarantee}
                required
            />
            <Input
                label="manufacturer_country"
                name="manufacturer_country"
                type="text"
                value={formValues.manufacturer_country}
                onInput={handleInput}
                error={formErrors.manufacturer_country}
                required
            />
            <Input
                label="description"
                name="description"
                type="text"
                value={formValues.description}
                onInput={handleInput}
                error={formErrors.description}
                required
            />
            <Input
                label="quantity"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onInput={handleInput}
                error={formErrors.quantity}
                required
            />
            <Input
                label="price"
                name="price"
                type="number"
                value={formValues.price}
                onInput={handleInput}
                error={formErrors.price}
                required
            />

            <div className="mb-4">
                <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Images</label>
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
    );
};

export default Form;

import useForm from "../../../hooks/useForm";
import Input from "../Input/Input";

// Пример реализации валидаций с использованием хука useForm()
const Form = () => {
    const { formValues, formErrors, handleInput } = useForm({
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
    });

    const handleSubmit = (event) => {
        event?.preventDefault();

        console.log("formValues", formValues);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-8 p-6 border rounded shadow-md"
        >
            <Input
                label="name"
                name="name"
                type="text"
                value={formValues?.name}
                onInput={handleInput}
                error={formErrors?.name}
                required
            />
            <Input
                label="model_phone"
                name="model_phone"
                type="text"
                value={formValues?.model_phone}
                onInput={handleInput}
                error={formErrors?.model_phone}
                required
            />
            <Input
                label="color"
                name="color"
                type="text"
                value={formValues?.color}
                onInput={handleInput}
                error={formErrors?.color}
                required
            />
            <Input
                label="processor"
                type="text"
                name="processor"
                value={formValues?.processor}
                onInput={handleInput}
                error={formErrors?.processor}
                required
            />
            <Input
                label="ram_capacity"
                type="number"
                name="ram_capacity"
                value={formValues?.ram_capacity}
                onInput={handleInput}
                error={formErrors?.ram_capacity}
                required
            />
            <Input
                label="memory_capacity"
                name="memory_capacity"
                type="number"
                value={formValues?.memory_capacity}
                onInput={handleInput}
                error={formErrors?.memory_capacity}
                required
            />
            <Input
                label="battery_capacity"
                name="battery_capacity"
                type="number"
                value={formValues?.battery_capacity}
                onInput={handleInput}
                error={formErrors?.battery_capacity}
                required
            />
            <Input
                label="release_year"
                name="release_year"
                type="number"
                value={formValues?.release_year}
                onInput={handleInput}
                error={formErrors?.release_year}
                required
            />
            <Input
                label="guarantee"
                type="guarantee"
                name="text"
                value={formValues?.guarantee}
                onInput={handleInput}
                error={formErrors?.guarantee}
                required
            />
            <Input
                label="manufacturer_country"
                type="manufacturer_country"
                name="text"
                value={formValues?.manufacturer_country}
                onInput={handleInput}
                error={formErrors?.manufacturer_country}
                required
            />
            <Input
                label="description"
                type="description"
                name="text"
                value={formValues?.description}
                onInput={handleInput}
                error={formErrors?.description}
                required
            />
            <Input
                label="quantity"
                type="quantity"
                name="number"
                value={formValues?.quantity}
                onInput={handleInput}
                error={formErrors?.quantity}
                required
            />
            <Input
                label="price"
                type="price"
                name="number"
                value={formValues?.price}
                onInput={handleInput}
                error={formErrors?.price}
                required
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                Добавить
            </button>
        </form>
    );
};

export default Form;

import React from "react";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../../../store/useProductsStore";
import useForm from "../../../hooks/useForm";
import Input from "../Input/Input";
import { useAuth } from "../../../hooks/useAuth";

const Form = (props) => {
  const { isSmartphone, isAccessory } = props.details;

  const { formValues, formErrors, handleInput, handleFileChange } = useForm({
    name: "",
    phone_model: "",
    color: "",
    processor: "",
    ram_capacity: "",
    memory_capacity: "",
    battery_capacity: "",
    release_year: "",
    guarantee: "",
    manufacturer_country: "",
    description: "",
    quantity: "",
    price: "",
    images: [],
  });

  const { user } = useAuth();

  const navigate = useNavigate();

  const addProduct = useProductsStore((state) => state.addProduct);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const files = event.target.images.files;
    const filesName = Array.from(files).map((file) => file.name);

    const productData = {
      ...formValues,
      is_verified: true,
      images: filesName,
      user_id: user?.id,
    };

    try {
      await addProduct(
        isSmartphone ? "smartphones" : "accessories",
        productData
      );
      navigate(`/`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const smartphoneFields = [
    { label: "Название", name: "name", type: "text" },
    { label: "Модель", name: "phone_model", type: "text" },
    { label: "Цвет", name: "color", type: "text" },
    { label: "Процессор", name: "processor", type: "text" },
    {
      label: "Страна производства",
      name: "manufacturer_country",
      type: "text",
    },
    { label: "Оперативная память", name: "ram_capacity", type: "number" },
    { label: "Внутренняя память", name: "memory_capacity", type: "number" },
    { label: "Емкость аккумулятора", name: "battery_capacity", type: "number" },
    { label: "Год выпуска", name: "release_year", type: "number" },
  ];

  const accessoryFields = [
    { label: "Название", name: "name", type: "text" },
    { label: "Модель", name: "phone_model", type: "text" },
    { label: "Цвет", name: "color", type: "text" },
    {
      label: "Страна производства",
      name: "manufacturer_country",
      type: "text",
    },
  ];

  // Выберите поля в зависимости от типа продукта
  const fields = isSmartphone
    ? smartphoneFields
    : isAccessory
    ? accessoryFields
    : [];

  return (
    <section className="add_product">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-2 relative">
        <div className="flex justify-around flex-wrap gap-4 mb-5">
          {fields.map((field, index) => (
            <div key={field.name} className="w-1/3">
              <Input
                label={field.label}
                name={field.name}
                type={field.type}
                value={formValues[field.name]}
                onInput={handleInput}
                error={formErrors[field.name]}
                required
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-5 ">
          <div>
            <label
              htmlFor="description"
              className="text-gray-200 font-bold mb-2"
            >
              Описание
            </label>
            <br></br>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onInput={handleInput}
              error={formErrors.description}
              required
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

        <div className="flex justify-center">
          <div>
            <label
              htmlFor="images"
              className="block text-gray-200 font-bold mb-2"
            >
              Изображения
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className=" border border-indigo-500 p-2 rounded-md focus:outline-none mb-1"
            />
          </div>
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
          Добавить
        </button>
      </form>
    </section>
  );
};

export default Form;

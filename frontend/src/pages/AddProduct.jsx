import { useLocation } from "react-router-dom";
import Form from "../components/ui/Form/Form";

const AddNewProduct = () => {
    const location = useLocation();

    // Определяем тип продукта на основе URL
    const isSmartphone = location.pathname.includes("smartphones");
    const isAccessory = location.pathname.includes("accessories");

    return (
        <div className="max-w-7xl mx-auto px-2 relative">
            <h1 className="mb-4 text-white text-4xl font-bold">Добавить продукт</h1>
            <div>
                <Form
                    details={{
                        isSmartphone: isSmartphone,
                        isAccessory: isAccessory
                    }}
                />
            </div>
        </div>
    );
};

export default AddNewProduct;

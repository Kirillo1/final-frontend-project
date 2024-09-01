import { useLocation } from "react-router-dom";
import Form from "../components/ui/Form/Form";

const AddNewProduct = () => {
    const location = useLocation();

    // Определяем тип продукта на основе URL
    const isSmartphones = location.pathname.includes("smartphones");
    const isAccessories = location.pathname.includes("accessories");
    
    return (
        <div className="max-w-7xl mx-auto px-2 relative">
            <h1 className="mb-4 text-white text-4xl font-bold">Добавить продукт</h1>
            <div>
                <Form />

            </div>
        </div>
    );
};

export default AddNewProduct;
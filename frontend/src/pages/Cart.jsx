import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import { Modal } from "../components/ui/Modal/Modal";
import useProductsStore from "../store/useProductsStore";
import Input from "../components/ui/Input/Input";
import Alert from "../components/ui/Alert/Alert";
import { useOrderForm } from "../hooks/useOrderForm";

import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate(); // хук для роутинга
    const {
        smartphones,
        accessories,
        fetchData,
    } = useProductsStore(state => ({
        smartphones: state.smartphones,
        accessories: state.accessories,
        fetchData: state.fetchData,
    }));

    const [showOrderModal, setShowOrderModal] = useState(false);

    // const [cartProducts, setCartProducts] = useState(new Set());

    
    useEffect(() => {
        const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        const cartProductsSet = new Set(storedCartProducts.map(item => `${item.type}-${item.id}`));
        
        setCartProducts(cartProductsSet);
    }, [smartphones, accessories]);
    
    // Использование кастомного хука для обработки данных регистрации
    const { orderFormValues, orderHandleInput, orderFormErrors, orderResetForm } = useOrderForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: ""
    });

    const allErrorsAreNull = Object.values(orderFormErrors).every(value => value === null);

    // Стейт для скрытия/показа и передачи сообщения в Alert
    const [alertState, setAlertState] = useState({
        isOpen: false,
        message: "",
    });

    // Обработчик закрытия компонента Alert
    const handleCloseAlert = () => {
        setAlertState({ ...alertState, isOpen: false });
    };

    // Обработка формы при регистрации
    const handleOrderForm = (event) => {
        event.preventDefault();

        setShowOrderModal(false); // Закрываем Modal
        orderResetForm(); // Сбрасываем форму
    };

    useEffect(() => {
        fetchData("smartphones", "smartphones");
        fetchData("accessories", "accessories");
    }, [fetchData]);

    const handleCardClick = (type, name, id) => {
        const route = type === "smartphones" ? `/smartphone/${name}/${id}/` : `/accessory/${name}/${id}/`;
        navigate(route);
    };

    // Обработчик закрытия модального окна (регистрация)
    const closeOrderModalAndResetForm = () => {
        setShowOrderModal(false);
        orderResetForm(); // Сбрасываем форму
    };

    // const cartProductsSmartphones = getCartProducts()?.smartphones || [];
    // const cartProductsAccessories = getCartProducts()?.accessories || [];

    // Объединение массивов
    // const combinedCartProducts = [...cartProductsSmartphones.map(item => ({ ...item, type: "smartphones" })),
    // ...cartProductsAccessories.map(item => ({ ...item, type: "accessories" }))];

    // // Рассчитать сумму товаров
    // const totalSum = combinedCartProducts.reduce((total, item) => total + item.price, 0);

    const handleOrderClick = () => {
        if (allErrorsAreNull) {
            closeOrderModalAndResetForm();

            setAlertState({
                isOpen: true,
                variant: "success",
                message: "Заказ оформлен",
            });
        }

    };


    return (
        <>
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Корзина</h1>

                <div className="max-w-7xl mx-auto px-2">
                    <div className="flex flex-wrap gap-9">
                        {/* {combinedCartProducts.map((item) => (
                            <Card
                                key={item?.id}
                                details={{
                                    ...item,
                                    isCartProduct: cartProducts.has(`${item.type}-${item.id}`)
                                }}
                                onCardClick={() => handleCardClick(item.type, item.type, item.id)}
                            />
                        ))} */}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-2">
                    {/* <h4 className="mt-4 mb-4 text-4xl font-bold text-zinc-100">Сумма: {totalSum.toLocaleString('ru-RU')} ₽</h4> */}
                </div>
                <div className="max-w-7xl mx-auto px-2">
                    <button
                        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowOrderModal(true)}
                    >
                        Оформить заказ
                    </button>
                </div>
                {showOrderModal && (
                    <Modal
                        title="Оформление"
                        isOpen={showOrderModal}
                        onClose={closeOrderModalAndResetForm}
                    >
                        <form 
                            onSubmit={handleOrderForm}
                            className="text-center"
                        >
                            <Input
                                label="Ваше имя"
                                name="first_name"
                                type="text"
                                value={orderFormValues?.first_name}
                                onInput={orderHandleInput}
                                placeholder="Введите ваше имя"
                                error={orderFormErrors?.first_name}
                                required
                            />
                            <Input
                                label="Ваша фамилия"
                                name="last_name"
                                type="text"
                                value={orderFormValues?.last_name}
                                onInput={orderHandleInput}
                                placeholder="Введите вашу фамилию"
                                error={orderFormErrors?.last_name}
                                required
                            />
                            <Input
                                label="Номер телефона"
                                name="phone_number"
                                type="text"
                                value={orderFormValues?.phone_number}
                                onInput={orderHandleInput}
                                placeholder="Введите вашу фамилию"
                                error={orderFormErrors?.phone_number}
                                required
                            />
                            <Input
                                label="Почта"
                                name="email"
                                type="email"
                                value={orderFormValues?.email}
                                onInput={orderHandleInput}
                                placeholder="Введите вашу фамилию"
                                error={orderFormErrors?.email}
                                required
                            />
                            <Input
                                label="Адрес"
                                name="address"
                                type="text"
                                value={orderFormValues?.address}
                                onInput={orderHandleInput}
                                placeholder="Введите адрес"
                                error={orderFormErrors?.address}
                                required
                            />
                            <button
                                className="bg-violet-500 text-white font-medium py-2 px-4 rounded"
                                type="submit"
                                disabled={!allErrorsAreNull} 
                                onClick={handleOrderClick}
                            >
                                Оформить
                            </button>
                        </form>
                    </Modal>
                )}
            </div>
        </section>
        <Alert
            title=""
            subtitle={alertState?.message}
            variant={alertState?.variant}
            isOpen={alertState?.isOpen}
            onClose={handleCloseAlert}
        />
        </>
    );
};

export default Cart;
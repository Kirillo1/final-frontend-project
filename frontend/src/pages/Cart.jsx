import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import { Modal } from "../components/ui/Modal/Modal";
import useProductsStore from "../store/useProductsStore";
import Input from "../components/ui/Input/Input";
import Alert from "../components/ui/Alert/Alert";
import { useOrderForm } from "../hooks/useOrderForm";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { smartphones, accessories, fetchData } = useProductsStore((state) => ({
    smartphones: state.smartphones,
    accessories: state.accessories,
    fetchData: state.fetchData,
  }));
  const [totalProductsSum, setTotalProductsSum] = useState(
    smartphones.reduce((total, item) => total + item.price, 0) +
      accessories.reduce((total, item) => total + item.price, 0)
  );

  const [showOrderModal, setShowOrderModal] = useState(false);

  const [cartProducts, setCartProducts] = useState({
    smartphones: [],
    accessories: [],
  });

  const loadCartProducts = () => {
    const storedCartProducts = localStorage.getItem("cartProducts");
    let storedData = storedCartProducts ? JSON.parse(storedCartProducts) : null;

    if (
      !storedData ||
      !Array.isArray(storedData.smartphones) ||
      !Array.isArray(storedData.accessories)
    ) {
      storedData = { smartphones: [], accessories: [] };
    }

    const validateProducts = (products) =>
      Array.isArray(products) ? products.filter((item) => item?.id) : [];

    setCartProducts({
      smartphones: validateProducts(storedData.smartphones),
      accessories: validateProducts(storedData.accessories),
    });
  };

  const updateProductQuantity = (type, id, newQuantity) => {
    setCartProducts((prevCart) => {
      const updatedCategory = prevCart[type].map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );

      const updatedCart = {
        ...prevCart,
        [type]: updatedCategory,
      };

      localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
      calculateTotalPrice(updatedCart);

      return updatedCart;
    });
  };

  const calculateTotalPrice = (updatedCart) => {
    // Функция для безопасного извлечения числового значения или 0
    const safeNumber = (value) => {
      const num = parseFloat(value);
      return isNaN(num) ? 0 : num;
    };

    // Пересчитываем цену для смартфонов
    const totalSmartphonesPrice = updatedCart.smartphones.reduce(
      (total, item) =>
        total + safeNumber(item.price) * safeNumber(item.quantity),
      0
    );

    // Пересчитываем цену для аксессуаров
    const totalAccessoriesPrice = updatedCart.accessories.reduce(
      (total, item) =>
        total + safeNumber(item.price) * safeNumber(item.quantity),
      0
    );
    console.log(totalSmartphonesPrice + totalAccessoriesPrice);
    // Устанавливаем общую сумму
    setTotalProductsSum(totalSmartphonesPrice + totalAccessoriesPrice);
  };

  useEffect(() => {
    loadCartProducts();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cartProducts") {
        loadCartProducts();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Использование кастомного хука для обработки данных регистрации
  const { orderFormValues, orderHandleInput, orderFormErrors, orderResetForm } =
    useOrderForm({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      address: "",
    });

  const allErrorsAreNull = Object.values(orderFormErrors).every(
    (value) => value === null
  );

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

  const handleCardClick = (type, id) => {
    const route =
      type === "smartphones"
        ? `/product_detail/smartphones/${id}/`
        : `/product_detail/accessories/${id}/`;
    navigate(route);
  };

  const closeOrderModalAndResetForm = () => {
    setShowOrderModal(false);
    orderResetForm(); // Сбрасываем форму
  };

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

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-9">
              {smartphones
                .filter((item) =>
                  cartProducts.smartphones.some((p) => p.id === item.id)
                )
                .map((item) => (
                  <Card
                    key={item?.id}
                    details={{
                      ...item,
                      isFavorite: true,
                      productType: "smartphones",
                    }}
                    onCardClick={() => handleCardClick("smartphones", item.id)}
                    onQuantityChange={(newQuantity) =>
                      updateProductQuantity("smartphones", item.id, newQuantity)
                    }
                  />
                ))}
              {accessories
                .filter((item) =>
                  cartProducts.accessories.some((p) => p.id === item.id)
                )
                .map((item) => (
                  <Card
                    key={item?.id}
                    details={{
                      ...item,
                      isFavorite: true,
                      productType: "accessories",
                    }}
                    onCardClick={() => handleCardClick("accessories", item.id)}
                  />
                ))}
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-2">
            <h4 className="mt-4 mb-4 text-4xl font-bold text-zinc-100">
              Сумма: {totalProductsSum.toLocaleString("ru-RU")} ₽
            </h4>
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
              <form onSubmit={handleOrderForm} className="text-center">
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

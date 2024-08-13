import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../store/useProductsStore";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';


const Home = () => {
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

    useEffect(() => {
        fetchData("smartphones", "smartphones");
        fetchData("accessories", "accessories");
    }, [fetchData]);

    const { user } = useAuth();

    const companySmartphones = smartphones.filter(
        (smartphone) => smartphone.user_id === user.id
    );

    const companyAccessories = accessories.filter(
        (accessory) => accessory.user_id === user.id
    );

    // Обработчик клика по карточке смартфона
    const handleSmartphoneCardClick = (name, id) => {
        navigate(`/smartphone/${name}/${id}/`)
    }

    // Обработчик клика по карточке аксессуара
    const handleAccessorCardClick = (name, id) => {
        navigate(`/accessory/${name}/${id}/`)
    }

    return (
        <section className="new-products">
            <div className="max-w-7xl mx-auto px-2 relative">
                <h1 className="mb-4 text-4xl font-bold text-zinc-100">Новинки 2024 года!</h1>

                <section className="smartphones">
                    <div className="max-w-7xl mx-auto px-2">
                        <h3 className="mb-4 text-4xl font-bold text-zinc-100">
                            Смартфоны
                        </h3>
                        <div className="flex flex-wrap gap-9">
                            {!!companySmartphones &&
                                companySmartphones.map((smartphone) => (
                                    <Card
                                        key={smartphone?.id}
                                        details={smartphone}
                                        onCardClick={handleSmartphoneCardClick}
                                    />
                                ))}
                        </div>
                    </div>
                </section>

                <section className="accessories">
                    <div className="max-w-7xl mx-auto px-2">
                        <h3 className="mb-4 text-4xl font-bold text-zinc-100">
                            Аксессуары
                        </h3>
                        <div className="flex flex-wrap gap-9">
                            {!!companyAccessories &&
                                companyAccessories.map((accessory) => (
                                    <Card
                                        key={accessory?.id}
                                        details={accessory}
                                        onCardClick={handleAccessorCardClick}
                                    />
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Home;
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "../components/ui/Image/Image";

const AccessoryCardDetail = () => {
    const { name, id } = useParams();
    const [accessory, setAccessor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccessor = async () => {
            try {
                const response = await fetch(`http://localhost:8080/accessories/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch smartphone");
                }
                const result = await response.json();
                setAccessor(result.data[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccessor();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="card-details">
            <div className="max-w-7xl mx-auto px-2">
                <Link
                    to="/accessories"
                    className="inline-flex text-indigo-500 hover:text-indigo-600 mb-8"
                >
                    Назад
                </Link>
                <h2 className="mb-4 text-4xl font-bold text-zinc-800">
                    {accessory?.name} {accessory?.phone_model}
                </h2>
                <div className="max-w-md rounded shadow-lg relative">
                    <div className="relative">
                        <div className="absolute inset-0 bg-black opacity-30 rounded"></div>
                        <Image
                            className="w-full max-h-44"
                            isCritical={true}
                            src={`/assets/smartphones/${accessory.images[0]}`}
                            alt={accessory.name}
                        />
                    </div>

                    <button
                        // className={`absolute top-0 left-0 m-2 p-2 rounded-full ${smartphone?.isFavorite ? "text-indigo-500" : "text-white"
                        //     }`}
                        className="absolute top-0 left-0 m-2 p-2 rounded-full text-white"
                    // onClick={() => onToggleFavorite(id)}
                    >
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                        </svg>
                    </button>
                    <div className="px-6 py-4">
                        <p className="text-gray-600 text-sm mb-2">{accessory?.description}</p>
                        <p className="text-gray-600 text-sm mb-2">{accessory?.color}</p>
                        <p className="text-gray-600 text-sm mb-2">{accessory?.quantity}</p>
                        <p className="text-gray-600 text-sm mb-2">{accessory?.manufacturer_country}</p>

                        {accessory?.rating && (
                            <div className="text-yellow-500 mb-2">
                                {"★".repeat(Math.floor(accessory?.rating)) +
                                    "☆".repeat(5 - Math.floor(accessory?.rating))}
                            </div>
                        )}
                        <div className="text-lg font-bold mb-2">{accessory?.price}$</div>
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default AccessoryCardDetail;
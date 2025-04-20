import {useEffect, useState} from "react";

function ProductCard({ product, changeQuantity, toggleFav }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const local = localStorage.getItem("favorites");
        if (local) {
            const favorites = JSON.parse(local);
            if (favorites.includes(product.pid)) {
                setIsFavorite(true);
            }
        }
    }, []);

    const toggleFavorite = () => {
        let local = localStorage.getItem("favorites") ?? "[]";
        local = JSON.parse(local);
        if (local.includes(product.pid)) {
            local = local.filter(pid => pid !== product.pid);
        } else {
            local.push(product.pid);
        }
        localStorage.setItem("favorites", JSON.stringify(local));
        setIsFavorite(!isFavorite);
        toggleFav(product.pid);
    }

    const quantityChange = (e) => {
        changeQuantity(product.pid, e.target.value);
    };

    const cost = product.price * product.quantity;

    return (
        <div className={"wrap-normal relative h-100 w-40 bg-white shadow-lg rounded-lg p-6 m-2 hover:shadow-xl transition-shadow duration-300"
        + (product.quantity > 0 ? " border-2 border-green-500" : " border-2 border-white")}>
            <div
                className="absolute top-2 right-2 cursor-pointer text-yellow-500 text-2xl hover:text-yellow-800 transition-colors duration-300"
                onClick={toggleFavorite}
            >
                {isFavorite ? "★" : "☆"}
            </div>

            <img
                src={product.images[0]}
                alt={product.name}
                className="h-30 w-40 rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-lg"
                onClick={() => setIsModalOpen(true)}
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="wrap-normal text-gray-600 text-sm mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">${product.price}</p>
            <div className="bottom-0 absolute w-40">
                <input
                    min="0"
                    value={product.quantity}
                    onChange={quantityChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-800 mt-4">subtotal: ${cost}</p>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 "
                    onClick={() => setIsModalOpen(false)}
                >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="max-w-1/2 h-1/2 rounded-md "
                        />
                </div>
            )}
        </div>
    );
}

export default ProductCard;
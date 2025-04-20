import ProductCard from "./ProductCard.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function ProductsPage({products, total, setQuantity}) {

    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [favOnly, setFavOnly] = useState(false);
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        const local = localStorage.getItem("favorites");
        if (local) {
            setFavorites(JSON.parse(local));
        }
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/cart");
    }

    let filteredProducts = products?.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });

    if (favOnly) filteredProducts = filteredProducts.filter(product => favorites.includes(product.pid));

    const toggleFavorite = (pid) => {
        if (favorites.includes(pid)) {
            setFavorites(favorites.filter(id => id !== pid));
        } else {
            setFavorites([...favorites, pid]);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="text-center mb-6">
                <button
                    onClick={handleClick}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                >
                    Go to Cart (${total})
                </button>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-16 mt-4 p-2 border border-gray-300 rounded-md w-64"
                />
                <label className="ml-4">
                    <input
                        type="checkbox"
                        checked={favOnly}
                        onChange={() => setFavOnly(!favOnly)}
                        className="mr-2"
                    />
                    Show favorites only
                </label>
            </div>
            <div className="flex flex-wrap w-3/4 justify-center mx-auto gap-3">
                {filteredProducts ?
                    filteredProducts.map((product => (
                        <ProductCard
                            products={products}
                            key={product.pid}
                            product={product}
                            changeQuantity={setQuantity}
                            toggleFav={toggleFavorite}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                        />
                    )))
                    :
                    <p className="text-gray-500 text-lg font-medium">Loading...</p>
                }
            </div>
        </div>
    )
}

export default ProductsPage;
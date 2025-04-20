import ProductCard from "./ProductCard.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function ProductsPage({products, total, setQuantity}) {

    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/cart");
    }

    const filteredProducts = products?.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });

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
            </div>
            <div className="flex flex-wrap w-3/4 justify-center mx-auto gap-3">
                {filteredProducts ?
                    filteredProducts.map((product => (
                        <ProductCard
                            key={product.pid}
                            product={product}
                            changeQuantity={setQuantity}
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
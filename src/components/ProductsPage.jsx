import ProductCard from "./ProductCard.jsx";
import {useNavigate} from "react-router-dom";

function ProductsPage({products, total, setQuantity}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/cart");
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
            </div>
            <div className="flex flex-wrap w-3/4 justify-around mx-auto gap-6">
                {products ?
                    products.map((product => (
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
import ProductCard from "./ProductCard.jsx";
import {useNavigate} from "react-router-dom";

function ProductsPage({products, setQuantity}) {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/cart");
    }

    return (
        <>
            <button onClick={handleClick}>cart</button>
            <div className="flex flex-wrap w-1/2 justify-around mx-auto">
                {products ?
                    products.map((product => (
                        <ProductCard key={product.pid} product={product} changeQuantity={setQuantity}/>
                    )))
                    :
                    <p>Loading</p>
                }
            </div>
        </>
    )
}

export default ProductsPage;
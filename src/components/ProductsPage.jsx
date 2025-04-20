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
            <div className="flex flex-wrap w-full justify-around">
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
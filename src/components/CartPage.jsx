import {createAnswer} from "../utils/jotformAPI.js";
import {useNavigate} from "react-router-dom";
import ProductListView from "./ProductListView.jsx";

function CartPage({formInfo, products, setQuantity, total, name, setName, addr, setAddr}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    const submit = () => {
        const boughtProducts = products.filter(product => product.quantity > 0);
        if (boughtProducts.length === 0) {
            alert("Please select at least one product");
            return;
        }
        if (!name || !addr) {
            alert("Please fill in all the fields");
            return;
        }
        createAnswer(formInfo.products, boughtProducts, name, addr);
    };

    const boughtProducts = products?.filter(product => product.quantity > 0);

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Back
                </button>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                    className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                />
                <span className="text-lg font-semibold">Total: ${total}</span>
                <button
                    onClick={submit}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Submit
                </button>
            </div>
            {boughtProducts?.length > 0 && (
                <div className="space-y-4">
                    {boughtProducts.map((product) => (
                        <ProductListView product={product} setQuantity={setQuantity} key={product.pid}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartPage;;
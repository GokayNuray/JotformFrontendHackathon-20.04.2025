import {createAnswer} from "../utils/jotformAPI.js";
import {useNavigate} from "react-router-dom";

function CartPage({formInfo, products, total, name, setName, addr, setAddr}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

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
    }

    return (
        <div className="flex flex-col w-full items-center p-4">
            <button onClick={handleClick}>Back</button>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Address" value={addr} onChange={(e) => setAddr(e.target.value)}/>
            <span>Total: {total}$</span>
            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default CartPage;
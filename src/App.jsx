import {useEffect, useState} from "react";
import {createAnswer, getFormInfo} from "./utils/jotformAPI.js";
import ProductCard from "./components/ProductCard.jsx";

function App() {

    const [formInfo, setFormInfo] = useState();
    console.log(formInfo);

    const products = formInfo?.["products"]?.map((product) => {
        return {
            pid: product.pid,
            name: product.name,
            description: product.description,
            price: product.price,
            images: JSON.parse(product.images),
            quantity: product.quantity,
        }
    });
    console.log(products);

    useEffect(() => {
        if (!formInfo) {
            setFormInfo("wait");
            getFormInfo(setFormInfo);
        }
    }, []);

    const submit = () => {
        const boughtProducts = products.filter(product => product.quantity > 0);
        if (boughtProducts.length === 0) {
            alert("Please select at least one product");
            return;
        }
        const name = "john"
        const addr = "istanbul"
        if (!name || !addr) {
            alert("Please fill in all the fields");
            return;
        }
        createAnswer(formInfo.products, boughtProducts, name, addr);
    }

    const setQuantity = (pid, quantity) => {
        for (let i = 0; i < products.length; i++) {
            if (products[i].pid === pid) {
                products[i].quantity = quantity;
                formInfo.products[i].quantity = quantity;
                setFormInfo({
                    ...formInfo,
                });
                break;
            }
        }
    }

    return (
        <div className="flex flex-wrap w-full justify-around">
            <button onClick={submit}>Submit</button>
            {products ?
                products.map((product => (
                    <ProductCard key={product.pid} product={product} changeQuantity={setQuantity}/>
                )))
                :
                <p>Loading</p>
            }
        </div>
    )
}

export default App

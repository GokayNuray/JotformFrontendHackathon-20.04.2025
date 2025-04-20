import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getFormInfo} from "./utils/jotformAPI.js";
import ProductsPage from "./components/ProductsPage.jsx";
import CartPage from "./components/CartPage.jsx";

function App() {

    const [formInfo, setFormInfo] = useState();
    const [name, setName] = useState();
    const [addr, setAddr] = useState();

    const products = formInfo?.["products"]?.map((product) => {
        return {
            pid: product.pid,
            name: product.name,
            description: product.description,
            price: product.price,
            images: JSON.parse(product.images),
            quantity: product.quantity ?? 0,
        }
    });

    useEffect(() => {
        if (!formInfo) {
            setFormInfo("wait");
            getFormInfo((data => {
                let local = localStorage.getItem("products");
                if (local) {
                    local = JSON.parse(local);
                    data.products.forEach((product) => {
                        if (local[product.pid]) {
                            product.quantity = local[product.pid];
                        }
                    });
                }
                setFormInfo(data);
            }));
        }
    }, []);


    const setQuantity = (pid, quantity) => {
        if (quantity === "") quantity = 0;
        if (isNaN(quantity)) return;
        quantity = parseInt(quantity);

        let local = localStorage.getItem("products") ?? "{}";
        local = JSON.parse(local);
        local[pid] = quantity;
        localStorage.setItem("products", JSON.stringify(local));

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

    let total = 0;
    products && products.forEach(product => {
        total += product.price * product.quantity;
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsPage products={products} total={total} setQuantity={setQuantity}/>}/>
                <Route path="/cart" element={<CartPage formInfo={formInfo} products={products} total={total}
                                                       setQuantity={setQuantity} name={name} addr={addr}
                                                       setName={setName} setAddr={setAddr}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

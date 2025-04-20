import {useEffect, useState} from "react";
import {getFormInfo} from "./utils/jotformAPI.js";
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
            quantity: 0,
        }
    });
    console.log(products);

    useEffect(() => {
        if (!formInfo) {
            setFormInfo("wait");
            getFormInfo(setFormInfo);
        }
    }, []);

  return (
    <div className="flex flex-wrap w-full justify-around">
        {products ?
            products.map((product => (
                <ProductCard key={product.pid} product={product}/>
            )))
            :
            <p>Loading</p>
        }
    </div>
  )
}

export default App

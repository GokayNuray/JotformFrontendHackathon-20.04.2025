import {useEffect, useState} from "react";
import {getFormInfo} from "./utils/jotformAPI.js";

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
    <>
        {products ?
            <p>{JSON.stringify(products)}</p>
            :
            <p>Loading</p>
        }
    </>
  )
}

export default App

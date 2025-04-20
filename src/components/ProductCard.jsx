function ProductCard({ product, changeQuantity }) {
    const quantityChange = (e) => {
        changeQuantity(product.pid, e.target.value);
    };

    const cost = product.price * product.quantity;

    return (
        <div className={"wrap-normal relative h-100 w-40 bg-white shadow-lg rounded-lg p-6 m-2 hover:shadow-xl transition-shadow duration-300"
        + (product.quantity > 0 ? " border-2 border-green-500" : " border-2 border-white")}>
            <img
                src={product.images[0]}
                alt={product.name}
                className="h-30 w-40 rounded-md mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="wrap-normal text-gray-600 text-sm mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">${product.price}</p>
            <div className="bottom-0 absolute w-40">
            <input
                min="0"
                value={product.quantity}
                onChange={quantityChange}
                className=" w-full border border-gray-300 rounded-md p-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-800 mt-4">subtotal: ${cost}</p>
        </div>
        </div>
    );
}

export default ProductCard;
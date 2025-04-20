function ProductCard({product, changeQuantity}) {

    const quantityChange = (e) => {
        changeQuantity(product.pid, e.target.value);
    }

    return (
        <div className="w-1/4 h-fit bg-white shadow-md rounded-lg p-4 m-4">
            <input type="checkbox" className="absolute top-2 right-2 z-10"/>
            <img src={product.images[0]} alt={product.name} className="h-32"/>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-lg font-semibold">{product.price}</p>
            <input type="number" min="0" value={product.quantity} onChange={quantityChange}/>
        </div>);
}

export default ProductCard;
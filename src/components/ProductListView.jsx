function ProductListView({product, setQuantity}) {
    return (
        <div className="w-full h-32 bg-white shadow-md rounded-lg p-4 m-4 flex flex-row items-center space-x-4">
            <img src={product.images[0]} alt={product.name} className="h-24 w-24 object-cover rounded-md"/>
            <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-lg font-semibold text-gray-700">${product.price}</p>
            </div>
            <input
                min="0"
                value={product.quantity}
                onChange={(e) => setQuantity(product.pid, e.target.value)}
                className="w-16 p-2 border border-gray-300 rounded-md text-center"
            />
        </div>
    );
}

export default ProductListView;
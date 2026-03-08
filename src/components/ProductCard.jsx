function ProductCard({ product, onAddToCart, onViewDetail }) {
    return (
        <article className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-card__image"
            />

            <div className="product-card__content">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__price">${product.price}</p>

                <div className="product-card__actions">
                    <button onClick={() => onViewDetail(product.id)}>
                        Ver detalle
                    </button>

                    <button onClick={() => onAddToCart(product)}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

function ProductCard({ product, onViewDetail }) {
    const { addToCart } = useCart();

    return (
        <article className="product-card">
            <img
                src={product.image}
                alt={product.title}
                className="product-card__image"
            />

            <div className="product-card__content">
                <span className="product-card__category">{product.category}</span>
                <h3 className="product-card__title" title={product.title}>
                    {product.title}
                </h3>
                <p className="product-card__price">{formatPrice(product.price)}</p>

                <div className="product-card__actions">
                    <button onClick={() => onViewDetail(product.id)}>
                        Ver detalle
                    </button>

                    <button onClick={() => addToCart(product)}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
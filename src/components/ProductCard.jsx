import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

function ProductCard({ product, onViewDetail }) {
    const { addToCart } = useCart();

    const handleCardClick = () => {
        onViewDetail(product.id);
    };

    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product);
    };

    return (
        <article
            className="product-card product-card--clickable"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCardClick();
                }
            }}
        >
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
                    <button type="button" onClick={handleAddToCart}>
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;
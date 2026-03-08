import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
    } = useCart();

    return (
        <>
            <Header />

            <main className="page">
                <header className="page-header">
                    <h1>Carrito de compra</h1>
                    <p>Gestiona los productos agregados</p>
                </header>

                {cartItems.length === 0 ? (
                    <section className="empty-state">
                        <p>Tu carrito está vacío.</p>
                        <Link to="/" className="link-button">
                            Ir a productos
                        </Link>
                    </section>
                ) : (
                    <section className="cart-layout">
                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onIncrease={increaseQuantity}
                                    onDecrease={decreaseQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>

                        <aside className="cart-summary">
                            <h2>Resumen</h2>
                            <p>
                                <strong>Total de productos:</strong> {totalItems}
                            </p>
                            <p>
                                <strong>Total a pagar:</strong> ${totalPrice.toFixed(2)}
                            </p>
                        </aside>
                    </section>
                )}
            </main>
        </>
    );
}

export default CartPage;
import { useMemo, useState } from 'react';
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
        clearCart,
    } = useCart();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);

    const orderSummary = useMemo(() => {
        return cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
        }));
    }, [cartItems]);

    const handleStartCheckout = () => {
        setIsCheckingOut(true);
        setPurchaseCompleted(false);
    };

    const handleCancelCheckout = () => {
        setIsCheckingOut(false);
    };

    const handleConfirmPurchase = () => {
        clearCart();
        setIsCheckingOut(false);
        setPurchaseCompleted(true);
    };

    return (
        <>
            <Header />

            <main className="page">
                <header className="page-header">
                    <h1>Carrito de compra</h1>
                    <p>Gestiona los productos agregados</p>
                </header>

                {purchaseCompleted ? (
                    <section className="checkout-success">
                        <h2>¡Compra confirmada!</h2>
                        <p>Tu compra fue simulada correctamente y el carrito fue limpiado.</p>
                        <Link to="/" className="link-button">
                            Volver a productos
                        </Link>
                    </section>
                ) : cartItems.length === 0 ? (
                    <section className="empty-state">
                        <p>Tu carrito está vacío.</p>
                        <Link to="/" className="link-button">
                            Ir a productos
                        </Link>
                    </section>
                ) : isCheckingOut ? (
                    <section className="checkout-summary">
                        <h2>Resumen del carrito</h2>

                        <div className="checkout-summary__list">
                            {orderSummary.map((item) => (
                                <article key={item.id} className="checkout-summary__item">
                                    <p>
                                        <strong>{item.title}</strong>
                                    </p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
                                </article>
                            ))}
                        </div>

                        <div className="checkout-summary__total">
                            <p>
                                <strong>Total de productos:</strong> {totalItems}
                            </p>
                            <p>
                                <strong>Total a pagar:</strong> ${totalPrice.toFixed(2)}
                            </p>
                        </div>

                        <div className="checkout-summary__actions">
                            <button onClick={handleCancelCheckout}>
                                Volver al carrito
                            </button>

                            <button onClick={handleConfirmPurchase}>
                                Confirmar compra
                            </button>
                        </div>
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

                            <button className="checkout-button" onClick={handleStartCheckout}>
                                Checkout
                            </button>
                        </aside>
                    </section>
                )}
            </main>
        </>
    );
}

export default CartPage;
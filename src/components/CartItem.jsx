function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    const subtotal = item.price * item.quantity;

    return (
        <article className="cart-item">
            <img
                src={item.image}
                alt={item.title}
                className="cart-item__image"
            />

            <div className="cart-item__content">
                <h3 className="cart-item__title">{item.title}</h3>
                <p className="cart-item__category">{item.category}</p>
                <p className="cart-item__price">${item.price}</p>
                <p className="cart-item__subtotal">
                    Subtotal: ${subtotal.toFixed(2)}
                </p>

                <div className="cart-item__actions">
                    <button onClick={() => onDecrease(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.id)}>+</button>
                    <button onClick={() => onRemove(item.id)}>Eliminar</button>
                </div>
            </div>
        </article>
    );
}

export default CartItem;
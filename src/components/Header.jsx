import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
    const { totalItems } = useCart();

    return (
        <header className="app-header">
            <div className="app-header__inner">
                <Link to="/" className="app-header__brand">
                    Mini e-commerce
                </Link>

                <nav className="app-header__nav">
                    <Link to="/" className="app-header__link">
                        Productos
                    </Link>

                    <Link to="/cart" className="app-header__link">
                        Carrito ({totalItems})
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
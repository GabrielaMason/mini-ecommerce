import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import ProductCard from '../components/ProductCard';

function ProductsPage({ products, status, errorMessage, onRetry }) {
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        console.log('Agregar al carrito:', product);
    };

    const handleViewDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === 'loading' || status === 'idle') {
        return <Loader />;
    }

    if (status === 'error') {
        return (
            <ErrorState
                message={errorMessage}
                onRetry={onRetry}
            />
        );
    }

    return (
        <main className="page">
            <header className="page-header">
                <h1>Mini e-commerce</h1>
                <p>Listado de productos</p>
            </header>

            <section className="products-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onViewDetail={handleViewDetail}
                    />
                ))}
            </section>
        </main>
    );
}

export default ProductsPage;
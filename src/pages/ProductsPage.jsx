import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import ProductCard from '../components/ProductCard';

function ProductsPage({ products, status, errorMessage, onRetry }) {
    const navigate = useNavigate();

    const handleViewDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === 'loading' || status === '') {
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
        <>
            <Header />

            <main className="page">
                <header className="page-header">
                    <h1>Listado de productos</h1>
                </header>

                <section className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewDetail={handleViewDetail}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}

export default ProductsPage;
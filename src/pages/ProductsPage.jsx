import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState(''); // loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        try {
            setStatus('loading');
            setErrorMessage('');

            const data = await getProducts();
            setProducts(data);
            setStatus('success');
        } catch (error) {
            setErrorMessage(error.message || 'Ocurrió un error inesperado');
            setStatus('error');
        }
    };

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    const handleAddToCart = (product) => {
        console.log('Agregar al carrito:', product);
    };

    const handleViewDetail = (productId) => {
        console.log('Ir a detalle:', productId);
    };

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'error') {
        return (
            <ErrorState
                message={errorMessage}
                onRetry={fetchProducts}
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
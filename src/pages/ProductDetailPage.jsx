import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

function ProductDetailPage({ products, productsStatus, onRetryProducts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [detailStatus, setDetailStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const numericId = useMemo(() => Number(id), [id]);

    useEffect(() => {
        const productFromState = products.find((item) => item.id === numericId);

        if (productFromState) {
            setProduct(productFromState);
            setDetailStatus('success');
            return;
        }

        if (productsStatus === 'loading' || productsStatus === '') {
            setDetailStatus('loading');
            return;
        }

        if (productsStatus === 'error') {
            setDetailStatus('error');
            setErrorMessage('No fue posible cargar la información del producto');
            return;
        }

        const fetchProduct = async () => {
            try {
                setDetailStatus('loading');
                setErrorMessage('');

                const data = await getProductById(numericId);
                setProduct(data);
                setDetailStatus('success');
            } catch (error) {
                setErrorMessage(error.message || 'Ocurrió un error al cargar el detalle');
                setDetailStatus('error');
            }
        };

        fetchProduct();
    }, [numericId, products, productsStatus]);

    const handleRetry = () => {
        if (products.length === 0) {
            onRetryProducts();
        } else {
            navigate('/');
        }
    };

    if (detailStatus === 'loading' || detailStatus === '') {
        return <Loader />;
    }

    if (detailStatus === 'error') {
        return (
            <ErrorState
                message={errorMessage}
                onRetry={handleRetry}
            />
        );
    }

    if (!product) {
        return (
            <ErrorState
                message="Producto no encontrado"
                onRetry={() => navigate('/')}
            />
        );
    }

    return (
        <>
            <Header />

            <main className="page">
                <button className="back-button" onClick={() => navigate('/')}>
                    ← Regresar al listado
                </button>

                <section className="product-detail">
                    <div className="product-detail__image-wrapper">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-detail__image"
                        />
                    </div>

                    <div className="product-detail__content">
                        <span className="product-detail__category">{product.category}</span>
                        <h1 className="product-detail__title">{product.title}</h1>
                        <p className="product-detail__price">{formatPrice(product.price)}</p>
                        <p className="product-detail__description">{product.description}</p>

                        <div className="product-detail__actions">
                            <button onClick={() => addToCart(product)}>
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProductDetailPage;
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

function ProductDetailPage({ products, productsStatus, onRetryProducts }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [detailStatus, setDetailStatus] = useState(''); // loading | success | error
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

        const fetchProductById = async () => {
            try {
                setDetailStatus('loading');
                setErrorMessage('');

                const response = await fetch(`https://fakestoreapi.com/products/${numericId}`);

                if (!response.ok) {
                    throw new Error('No se pudo obtener el detalle del producto');
                }

                const data = await response.json();
                setProduct(data);
                setDetailStatus('success');
            } catch (error) {
                setErrorMessage(error.message || 'Ocurrió un error al cargar el detalle');
                setDetailStatus('error');
            }
        };

        fetchProductById();
    }, [numericId, products, productsStatus]);

    const handleAddToCart = () => {
        console.log('Agregar al carrito desde detalle:', product);
    };

    const handleRetry = () => {
        if (products.length === 0) {
            onRetryProducts();
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
                    <p className="product-detail__price">${product.price}</p>
                    <p className="product-detail__description">{product.description}</p>

                    <div className="product-detail__actions">
                        <button onClick={handleAddToCart}>Agregar al carrito</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProductDetailPage;
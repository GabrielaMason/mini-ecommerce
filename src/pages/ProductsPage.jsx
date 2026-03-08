import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import ProductCard from '../components/ProductCard';

function ProductsPage({ products, status, errorMessage, onRetry }) {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        return ['all', ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === 'all' || product.category === selectedCategory;

            const matchesSearch = product.title
                .toLowerCase()
                .includes(searchTerm.trim().toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchTerm]);

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

                <section className="filters-bar">
                    <div className="filters-bar__group">
                        <label htmlFor="search">Buscar por nombre</label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Ej. shirt"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="filters-bar__input"
                        />
                    </div>

                    <div className="filters-bar__group">
                        <label htmlFor="category">Filtrar por categoría</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            className="filters-bar__select"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'Todas' : category}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {filteredProducts.length === 0 ? (
                    <section className="empty-state">
                        <p>No se encontraron productos con esos filtros.</p>
                    </section>
                ) : (
                    <section className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewDetail={handleViewDetail}
                            />
                        ))}
                    </section>
                )}
            </main>
        </>
    );
}

export default ProductsPage;
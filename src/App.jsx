import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getProducts } from './api/products';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage
              products={products}
              status={status}
              errorMessage={errorMessage}
              onRetry={fetchProducts}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              products={products}
              productsStatus={status}
              onRetryProducts={fetchProducts}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
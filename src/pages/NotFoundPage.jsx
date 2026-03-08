import { Link } from 'react-router-dom';
import Header from '../components/Header';

function NotFoundPage() {
    return (
        <>
            <Header />

            <main className="page">
                <section className="empty-state">
                    <h1>Página no encontrada</h1>
                    <p>La ruta que intentaste abrir no existe.</p>
                    <Link to="/" className="link-button">
                        Volver al inicio
                    </Link>
                </section>
            </main>
        </>
    );
}

export default NotFoundPage;
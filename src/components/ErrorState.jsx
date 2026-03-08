function ErrorState({ message, onRetry }) {
    return (
        <div className="error-state">
            <p>{message}</p>
            <button onClick={onRetry}>Reintentar</button>
        </div>
    );
}

export default ErrorState;
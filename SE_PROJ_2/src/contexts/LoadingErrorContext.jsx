import React, { createContext, useState, useContext } from 'react';

const LoadingErrorContext = createContext();

export const useLoadingError = () => useContext(LoadingErrorContext);

export const LoadingErrorProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const setLoading = (loading) => setIsLoading(loading);
    const setErrorMsg = (errorMsg) => setError(errorMsg);
    const resetError = () => setError(null);

    return (
        <LoadingErrorContext.Provider value={{ isLoading, error, setLoading, setErrorMsg, resetError }}>
            {children}
        </LoadingErrorContext.Provider>
    );
};

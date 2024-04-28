import React, { createContext, useState, useContext } from 'react';

const LoadingErrorContext = createContext();

export const useLoadingError = () => useContext(LoadingErrorContext);

export const LoadingErrorProvider = ({ children }) => {
    const [loadingStates, setLoadingStates] = useState({});
    const [errorStates, setErrorStates] = useState({});

    const setLoading = (name, loading) => {
        setLoadingStates(prevStates => ({
            ...prevStates,
            [name]: loading,
        }));
    };

    const setError = (name, errorMsg) => {
        setErrorStates(prevStates => ({
            ...prevStates,
            [name]: errorMsg,
        }));
    };

    const resetError = (name) => {
        setErrorStates(prevStates => {
            const newStates = { ...prevStates };
            delete newStates[name];
            return newStates;
        });
    };

    return (
        <LoadingErrorContext.Provider value={{ loadingStates, errorStates, setLoading, setError, resetError }}>
            {children}
        </LoadingErrorContext.Provider>
    );
};

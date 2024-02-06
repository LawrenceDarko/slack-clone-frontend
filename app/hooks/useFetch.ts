'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (axiosParams: any) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params: any) => {
        try {
            const result = await axios.request(params);
            setResponse(result.data.data.paymentPages);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, [axiosParams]); // Trigger fetchData when axiosParams change

    return { response, error, loading };
};

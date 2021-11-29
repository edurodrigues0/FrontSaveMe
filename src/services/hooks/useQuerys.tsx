import React, { useState } from 'react'

interface QuerysProps {
    id: number;
    name: string;
    photo: string;
    whats: string;
    subject: number;
    format: number;
    title: string;
    description: string;
    like: number;
    city: string;
    country: string;
}

export default function useQuerys(pageLimit: number) {
    const [querys, setQuerys] = useState<QuerysProps[]>()

    function fetchQuerys(page: number) {
        const virtualPage = ((page - 1) * pageLimit) ? 0 : ((page - 1) * pageLimit)

        fetch(
            `http://localhost:3000/search/duvidas?_start=${virtualPage}&_limit=${pageLimit}`
        )
        .then(res => res.json())
        .then(data => setQuerys(data))
        .catch(window.alert)
    }

    return {
        fetchQuerys,
        querys
    }
}
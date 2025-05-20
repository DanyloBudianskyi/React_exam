import { useState, useEffect } from "react";

export function useFetchData(fileName){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = () => {
        setIsLoading(true);
    
        fetch(fileName)
           .then(res => res.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false));
    }
    useEffect(() => {
        loadData()
    },[fileName])

    return{
        data, isLoading, error
    }
}


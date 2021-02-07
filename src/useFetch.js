import {useState, useEffect} from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        /* Simulates 1 second loading for the page
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
            });
        }, 1000);
        */

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('404 page not found.');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log("Fetch aborted.");
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });
        
        return () => abortCont.abort(); //abort fetch
    },[url]);

    return { data, isPending, error };
};

export default useFetch;
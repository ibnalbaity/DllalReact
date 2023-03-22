import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);

    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    };

    useEffect(() => {
        window.addEventListener('scroll', isScrolling);
        return () => window.removeEventListener('scroll', isScrolling);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;

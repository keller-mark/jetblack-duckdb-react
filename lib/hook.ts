import { useContext, useEffect } from 'react'

import DuckDBContext from './DuckDBContext'

export function useDuckDB() {
    const context = useContext(DuckDBContext);
    const { instantiate, setInstantiate } = context;

    // We only want to call setInstantiate(true) if the
    // useDuckDB hook is called at least once in our app.
    useEffect(() => {
        if (!instantiate && setInstantiate) {
            setInstantiate(true);
        }
    }, []);

    return context;
}

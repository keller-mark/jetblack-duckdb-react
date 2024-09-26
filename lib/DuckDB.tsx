import { ReactNode, useEffect, useState, useRef } from 'react'

import {
  AsyncDuckDB,
  DuckDBBundles,
  DuckDBConfig,
  InstantiationProgress,
  Logger
} from '@duckdb/duckdb-wasm'

import DuckDBContext from './DuckDBContext'

import { instantiateDuckDB } from './instantiateDB'

export type DuckDBProps = {
  /** Optional DuckDB bundles. If undefined the JsDelivr CDN will be used */
  bundles?: DuckDBBundles
  /** Optional logger. If undefined ConsoleLogger will be used. */
  logger?: Logger
  /** Optional configuration. */
  config?: DuckDBConfig
  /** Child elements will have access to the DuckDB context with useContext */
  children: ReactNode | ReactNode[]
}

/**
 * A context provider for DuckDB.
 *
 * @param props The provider properties
 * @returns A context provider for DuckDB
 */
export default function DuckDB({
  bundles,
  logger,
  config,
  children
}: DuckDBProps) {
  const dbRef = useRef<AsyncDuckDB>()
  const [instantiate, setInstantiate] = useState(false);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const [progress, setProgress] = useState<InstantiationProgress>()

  const handleProgress = (progress: InstantiationProgress) => {
    setProgress(progress)
  }

  useEffect(() => {
    if (!instantiate) {
      // The useDuckDB hook has not been used yet.
      return;
    }
    if(dbRef.current) {
      // The database was already loaded successfully.
      return;
    }
    instantiateDuckDB(bundles, config, logger, handleProgress)
      .then((db) => {
        dbRef.current = db;
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [instantiate, logger, bundles, config])

  return (
    <DuckDBContext.Provider value={{ db: dbRef.current, loading, error, progress, instantiate, setInstantiate }}>
      {children}
    </DuckDBContext.Provider>
  )
}

# use-duckdb

A DuckDB context provider for React.

## Installation

Install from [npmjs](https://www.npmjs.com/package/use-duckdb).

```bash
npm install use-duckdb
```

## Development

## Usage

Use the `DuckDB` context provider to connect to the database.

Children of the `DuckDB` component will have access to the database context.

```typescript
import DuckDB, { useDuckDB } from 'use-duckdb';

export default function App() {
  return (
    <DuckDB>
      <HelloWorld />
    </DuckDB>
  )
}

function HelloWorld() {
  // Get the DuckDB context from the hook.
  const { db, loading, error } = useDuckDB()

  useEffect(() => {
    if (loading || !db || error) {
      return
    }

    // Do something with duckdb.

  }, [loading, db, error])

  return <div>Hello, World!</div>
}

```

The `DuckDB` component takes the following properties:

* `bundles`: [`DuckDBBundles`](https://shell.duckdb.org/docs/interfaces/index.DuckDBBundles.html) `|` `undefined` - see the section on bundles below,
* `config`: [`DuckDBConfig`](https://shell.duckdb.org/docs/interfaces/index.DuckDBConfig.html) `|` `undefined` - Optional configuration to apply to the database.
* `logger`: [`Logger`](https://shell.duckdb.org/docs/interfaces/index.Logger.html) `|` `undefined` - defaults to the built in [`ConsoleLogger`](https://shell.duckdb.org/docs/classes/index.ConsoleLogger.html).

The properties returned by `useDuckDB` are:

* `db`: [`AsyncDuckDB`](https://shell.duckdb.org/docs/classes/index.AsyncDuckDB.html) `|` `undefined` - Set to the database when successfully instantiated.
* `progress`: [`InstantiationProgress`](https://shell.duckdb.org/docs/interfaces/index.InstantiationProgress.html) `|` `undefined` - This is updated during the database instantiation.
* `loading`: `boolean` - This is initially `false`, becoming `true` when either the `db` or `error` property is set.
* `error`: `string | Error | undefined` - Set to the error when instantiation has failed.


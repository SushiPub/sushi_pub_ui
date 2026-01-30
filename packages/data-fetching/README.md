# @sushi-pub/data-fetching

Data fetching utilities with caching and React hooks for the SushiPub UI Framework.

## Installation

```bash
npm install @sushi-pub/data-fetching
```

## Features

- ✅ React hooks for data fetching
- ✅ Built-in caching with TTL
- ✅ Loading and error states
- ✅ Mutation support (POST, PUT, DELETE, PATCH)
- ✅ TypeScript support
- ✅ Refetch capability

## Usage

### Basic Data Fetching

```typescript
import { useFetch } from '@sushi-pub/data-fetching';

function UserList() {
  const { data, loading, error, refetch } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Data Fetching with Caching

```typescript
import { useFetch } from '@sushi-pub/data-fetching';

function CachedData() {
  const { data, loading } = useFetch('/api/data', {
    cache: {
      enabled: true,
      ttl: 300000, // Cache for 5 minutes
    },
  });

  return <div>{JSON.stringify(data)}</div>;
}
```

### Mutations

```typescript
import { useMutation } from '@sushi-pub/data-fetching';

function CreateUser() {
  const { data, loading, error, mutate } = useMutation('/api/users');

  const handleCreate = async () => {
    await mutate({ name: 'John Doe', email: 'john@example.com' }, 'POST');
  };

  return (
    <button onClick={handleCreate} disabled={loading}>
      {loading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

### Clear Cache

```typescript
import { clearCache } from '@sushi-pub/data-fetching';

function Settings() {
  return (
    <button onClick={clearCache}>
      Clear All Cache
    </button>
  );
}
```

## API

### useFetch<T>(url: string | null, config?: RequestConfig)

React hook for fetching data.

**Returns:**
- `data: T | null` - The fetched data
- `loading: boolean` - Loading state
- `error: Error | null` - Error if occurred
- `refetch: () => Promise<void>` - Function to refetch data

### useMutation<T, V>(url: string, config?: RequestConfig)

React hook for mutations.

**Returns:**
- `data: T | null` - The response data
- `loading: boolean` - Loading state
- `error: Error | null` - Error if occurred
- `mutate: (variables: V, method?: HttpMethod) => Promise<T>` - Function to perform mutation

### fetchData<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>>

Direct data fetching function (non-hook).

### clearCache(): void

Clear all cached data.

## License

MIT

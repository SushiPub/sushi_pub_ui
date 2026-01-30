import React from 'react';
import { useFetch, useMutation, clearCache } from '@sushi-pub/data-fetching';
import { SEO, StructuredData } from '@sushi-pub/seo';
import { generateSitemap, createSitemapUrl } from '@sushi-pub/sitemap-generation';
import { useAIPageGenerator } from '@sushi-pub/builder-ai';

/**
 * Example 1: Data Fetching with Caching
 */
function UserList() {
  const { data, loading, error, refetch } = useFetch<{ users: any[] }>(
    'https://api.example.com/users',
    {
      cache: {
        enabled: true,
        ttl: 300000, // Cache for 5 minutes
      },
    }
  );

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={refetch}>Refresh</button>
      <button onClick={clearCache}>Clear Cache</button>
      <ul>
        {data?.users.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Example 2: Data Mutation (Create User)
 */
function CreateUserForm() {
  const { data, loading, error, mutate } = useMutation<any, { name: string; email: string }>(
    'https://api.example.com/users'
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await mutate(
        {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
        },
        'POST'
      );
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {error && <div>Error: {error.message}</div>}
      {data && <div>Created: {JSON.stringify(data)}</div>}
    </form>
  );
}

/**
 * Example 3: SEO Optimization
 */
function ProductPage() {
  const product = {
    id: 1,
    name: 'Amazing Product',
    description: 'This is an amazing product that you will love',
    price: 99.99,
    image: 'https://example.com/product.jpg',
  };

  return (
    <>
      <SEO
        title={`${product.name} - Buy Now`}
        description={product.description}
        keywords={['product', 'ecommerce', 'amazing']}
        canonical={`https://example.com/products/${product.id}`}
        ogType="product"
        ogTitle={product.name}
        ogDescription={product.description}
        ogImage={product.image}
        twitterCard="summary_large_image"
        twitterTitle={product.name}
        twitterDescription={product.description}
        twitterImage={product.image}
      />
      
      <StructuredData
        data={{
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
          },
        }}
      />

      <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button>
      </div>
    </>
  );
}

/**
 * Example 4: Sitemap Generation
 */
function generateWebsiteSitemap() {
  const pages = [
    { path: '/', priority: 1.0, changefreq: 'daily' as const },
    { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/products', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/blog', priority: 0.9, changefreq: 'daily' as const },
    { path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
  ];

  const sitemap = generateSitemap({
    hostname: 'https://example.com',
    urls: pages.map(page =>
      createSitemapUrl(page.path, {
        priority: page.priority,
        changefreq: page.changefreq,
      })
    ),
  });

  console.log('Generated Sitemap:');
  console.log(sitemap);

  // In a real application, you would write this to a file or serve it dynamically
  return sitemap;
}

/**
 * Example 5: AI-Powered Website Builder
 */
function AIWebsiteBuilder() {
  const { page, loading, error, generate } = useAIPageGenerator();
  const [prompt, setPrompt] = React.useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    try {
      await generate(prompt);
    } catch (err) {
      console.error('Failed to generate page:', err);
    }
  };

  return (
    <div>
      <h2>AI Website Builder</h2>
      
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the website you want to build..."
          rows={4}
          style={{ width: '100%' }}
        />
        <button onClick={handleGenerate} disabled={loading || !prompt.trim()}>
          {loading ? 'Generating...' : 'Generate Website'}
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}

      {page && (
        <div>
          <h3>Generated Page: {page.title}</h3>
          <p>{page.description}</p>
          <p>Layout: {page.layout}</p>
          
          <h4>Components ({page.components.length}):</h4>
          {page.components.map((component) => (
            <div key={component.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h5>{component.name}</h5>
              <p>{component.description}</p>
              <p>Category: {component.category}</p>
              <details>
                <summary>View Code</summary>
                <pre>{component.code}</pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Example 6: Complete Application
 */
function App() {
  const [activeTab, setActiveTab] = React.useState('users');

  return (
    <div style={{ padding: '20px' }}>
      <h1>SushiPub UI Framework - Examples</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('users')}>User List</button>
        <button onClick={() => setActiveTab('create')}>Create User</button>
        <button onClick={() => setActiveTab('product')}>Product Page (SEO)</button>
        <button onClick={() => setActiveTab('sitemap')}>Generate Sitemap</button>
        <button onClick={() => setActiveTab('ai')}>AI Builder</button>
      </nav>

      {activeTab === 'users' && <UserList />}
      {activeTab === 'create' && <CreateUserForm />}
      {activeTab === 'product' && <ProductPage />}
      {activeTab === 'sitemap' && (
        <div>
          <h2>Sitemap Generation</h2>
          <button onClick={generateWebsiteSitemap}>Generate Sitemap</button>
          <p>Check console for output</p>
        </div>
      )}
      {activeTab === 'ai' && <AIWebsiteBuilder />}
    </div>
  );
}

export default App;

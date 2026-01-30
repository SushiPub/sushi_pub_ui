# @sushi-pub/builder-ai

AI-powered website building utilities for the SushiPub UI Framework.

## Installation

```bash
npm install @sushi-pub/builder-ai
```

## Features

- ✅ AI-powered component generation
- ✅ Automatic page structure creation
- ✅ Component library with templates
- ✅ React hooks for AI operations
- ✅ Component optimization
- ✅ TypeScript support

## Usage

### AI Component Generation

```typescript
import { useAIComponentGenerator } from '@sushi-pub/builder-ai';

function ComponentBuilder() {
  const { suggestions, loading, generate } = useAIComponentGenerator();

  const handleGenerate = async () => {
    await generate('Create a hero section with call-to-action');
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        Generate Components
      </button>
      {suggestions.map(comp => (
        <div key={comp.id}>
          <h3>{comp.name}</h3>
          <p>{comp.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### AI Page Generation

```typescript
import { useAIPageGenerator } from '@sushi-pub/builder-ai';

function PageBuilder() {
  const { page, loading, generate } = useAIPageGenerator();

  const handleGenerate = async () => {
    await generate('Create a landing page for a SaaS product');
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        Generate Page
      </button>
      {page && (
        <div>
          <h2>{page.title}</h2>
          <p>Components: {page.components.length}</p>
        </div>
      )}
    </div>
  );
}
```

### Direct API Usage

```typescript
import { generateComponentSuggestions, generatePageStructure } from '@sushi-pub/builder-ai';

async function buildWebsite() {
  // Generate components
  const components = await generateComponentSuggestions(
    'Create a pricing section with 3 tiers'
  );

  // Generate full page
  const page = await generatePageStructure(
    'E-commerce product landing page'
  );

  console.log('Generated:', components, page);
}
```

### Using Component Library

```typescript
import { componentLibrary } from '@sushi-pub/builder-ai';

function TemplateSelector() {
  return (
    <div>
      <h2>Available Templates</h2>
      {componentLibrary.map(template => (
        <div key={template.id}>
          <h3>{template.name}</h3>
          <p>{template.description}</p>
          <span>Category: {template.category}</span>
        </div>
      ))}
    </div>
  );
}
```

### Component Optimization

```typescript
import { optimizeComponentProps } from '@sushi-pub/builder-ai';

async function optimizeComponent() {
  const component = {
    id: 'hero-1',
    name: 'Hero Section',
    props: { title: 'Welcome' },
    // ... other properties
  };

  const optimized = await optimizeComponentProps(
    component,
    'Make it more compelling for a tech startup'
  );

  console.log('Optimized props:', optimized);
}
```

## API

### useAIComponentGenerator(config?: AIConfig)

React hook for component generation.

**Returns:**
- `suggestions: ComponentTemplate[]` - Generated components
- `loading: boolean` - Loading state
- `error: Error | null` - Error if occurred
- `generate: (prompt: string) => Promise<ComponentTemplate[]>` - Generate function

### useAIPageGenerator(config?: AIConfig)

React hook for page generation.

**Returns:**
- `page: PageStructure | null` - Generated page structure
- `loading: boolean` - Loading state
- `error: Error | null` - Error if occurred
- `generate: (description: string) => Promise<PageStructure>` - Generate function

### generateComponentSuggestions(prompt: string, config?: AIConfig): Promise<ComponentTemplate[]>

Generate component suggestions from a prompt.

### generatePageStructure(description: string, config?: AIConfig): Promise<PageStructure>

Generate a full page structure from a description.

### optimizeComponentProps(component: ComponentTemplate, context: string, config?: AIConfig): Promise<Record<string, any>>

Optimize component properties using AI.

### componentLibrary: ComponentTemplate[]

Pre-built component templates.

## Types

```typescript
interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  props: Record<string, any>;
  code: string;
}

interface PageStructure {
  title: string;
  description: string;
  components: ComponentTemplate[];
  layout: 'single-column' | 'two-column' | 'three-column' | 'custom';
}

interface AIConfig {
  apiKey?: string;
  endpoint?: string;
  model?: string;
}
```

## Note

The current implementation uses simulated AI responses for demonstration purposes. In a production environment, you would connect to a real AI API endpoint (such as OpenAI, Anthropic, etc.) by providing the appropriate configuration.

## License

MIT

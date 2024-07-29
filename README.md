# Video Jungle API Client (TypeScript)

This is a TypeScript client for the Video Jungle API. It provides a simple interface to interact with the Video Jungle API in Node.js environments.

## Installation

You can install the Video Jungle API client using npm:

```
npm install @skate85/videojungle
```

## Usage

Here's a simple example of how to use the Video Jungle API client:

```typescript
import { ApiClient } from 'videojungle';

const client = new ApiClient('your_api_token_here');

// Get a project
client.projects.get('2ec097cd-1fff-4824-a7bf-a0e14281f4e5')
  .then(project => console.log(project))
  .catch(error => console.error(error));

// Using async/await
async function getProject() {
  try {
    const project = await client.projects.get('2ec097cd-1fff-4824-a7bf-a0e14281f4e5');
    console.log(project);
  } catch (error) {
    console.error(error);
  }
}

getProject();
```

## License

This project is licensed under the MIT License.
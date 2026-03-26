# IdeaCLI

IdeaCLI is a high-performance, local-first command-line interface designed for the rapid storage and retrieval of ideas. It provides a frictionless workflow for developers and power users to capture thoughts without leaving the terminal environment.

## Features

- **Persistent Storage**: Data is stored locally in a structured JSON format within the user's home directory (`~/.ideacli/ideas.json`).
- **Low Latency**: Optimized for sub-second response times for all operations.
- **Enhanced Search**: Quickly find ideas by key, content, or tags.
- **Tagging Support**: Organize ideas with custom tags for better categorization.
- **Minimalist Design**: Zero-dependency on external UI or cloud services.
- **Typed Implementation**: Built using TypeScript for robust data handling.

## Installation

### Prerequisites

- Node.js (version 16.x or higher)
- npm

### Global Installation

To install IdeaCLI globally on your system, execute the following commands in the project root:

```bash
npm install
npm run build
npm link
```

## Usage

IdeaCLI provides a set of commands to manage your personal ideas repository.

### Store an Idea

Save a new idea by providing a unique key and the content. You can also add optional tags.

```bash
ideacli store <key> <content> [--tags <tags>]
```

Example:
```bash
ideacli store "architecture-v1" "Switch to micro-frontends for better scalability." --tags "work,important"
```

### Edit an Idea

Update the content or tags of an existing idea. This will also update the `updatedAt` timestamp.

```bash
ideacli edit <key> <new-content> [--tags <tags>]
```

Example:
```bash
ideacli edit "architecture-v1" "Switch to micro-frontends for better scalability and modularity."
```

### Search Ideas

Search for ideas that match a query in the key, content, or tags.

```bash
ideacli search <query>
```

Example:
```bash
ideacli search "micro-frontends"
```

### Retrieve an Idea

Fetch the details of a specific idea using its key.

```bash
ideacli get <key>
```

### List All Ideas

Display a summary of all stored ideas.

```bash
ideacli list
```

### Delete an Idea

Remove an idea from the local database.

```bash
ideacli delete <key>
```

## Technical Architecture

IdeaCLI is built using the following technologies:
- **Language**: TypeScript
- **Runtime**: Node.js
- **CLI Framework**: Commander.js
- **Styling**: Chalk
- **Storage**: Persistent Local JSON

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

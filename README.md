<div align='center'>

# DOCWARE

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![License](https://img.shields.io/badge/license-AGPL--3.0-blue)
![bun](https://img.shields.io/badge/package%20manager-bun-red)
![turbo](https://img.shields.io/badge/build%20system-turborepo-white)

A unified documentation solution that consolidates all your project's documentation, both internal and external, into a single, convenient interface.

</div>

> This project is currently under active development and the documentation might not be as accurate as it should be.
>
> Please [create an issue](https://github.com/0xlebogang/docware/issues) if you come accross any inacuracies. _Thank You_

## Overview

Docware is a comprehensive documentation aggregation platform designed to streamline access to project documentation. By leveraging web scraping and AI-powered content restructuring, it consolidates documentation sources into a unified, searchable interface. This approach eliminates the need to navigate multiple documentation sites on countless browser tabs, providing developers with a single source of truth for all project-related information.

The platform is actively evolving with continuous improvements to enhance accuracy and user experience.

## Getting Started

To get Docware up and running for development, follow these steps:

### Prerequisites

We use [mise](https://mise.jdx.dev) to manage the project's tooling. You can either use mise or [manually](#manual-tool-setup) install the required tools.

> [git](https://git-scm.com/downloads) is also required to clone the repository and track any further contributions. (should we even mention this? :D)

#### Setup mise (Recommended)

> This guide assumes you already have the latest stable version of [docker & docker compose](https://docs.docker.com/get-docker/) installed on your system.

1. Follow the instructions [here](https://mise.jdx.dev/getting-started.html#installing-mise-cli) to install mise.

2. Setup mise to manage your `PATH` variables while in the project directory by following the instructions [here](https://mise.jdx.dev/getting-started.html#activate-mise). (optional but recommended)
	 > If you choose not to, you'll need to prefix all commands that use the tools installed by mise with `mise x --`. For example, instead of running `bun install`, you would run `mise x -- bun install`.
3. Install Turborepo globally
	 ```bash
	 npm install --global turbo@latest

	 # OR

	 mise x -- npm install --global turbo@latest
	 ```

4. Skip to [running the project](#running-the-project).

#### Manual tool setup

Ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v20.9+) - Optional but recommended

	> Some of Turborepo's functionality requires a node environment to be available

- [Bun](https://bun.sh/docs/installation) (v1.3+)
- [Turborepo](https://turborepo.com/docs) (v2.6+)
- [Go](https://go.dev/doc/install) (v1.24.4+)
- [Golangci-lint](https://golangci-lint.run/docs/welcome/install/local/) (latest stable version)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (latest stable versions)

### Running the project

1. Clone the repository:

	 ```bash
	 # HTTPS
	 git clone https://github.com/0xlebogang/docware.git
	 cd docware
	 ```

	 ```bash
	 # SSH
	 git clone git@github.com:0xlebogang/docware.git
	 cd docware
	 ```

2. Install tools:

	 If you are using mise, run:

	 ```bash
	 mise trust

	 mise install
	 ```

	 If you are managing tools manually, ensure you have installed all the necessary [tools](#manual-tool-setup) listed above.

3. Install project dependencies:

	 ```bash
	 bun install
	 ```

4. Setup environment variables:

	 Each service has its own `.env.example` file located in its respective root directory (same location as the package's `package.json`). Copy these files to create `.env` files and populate their values as needed. You can use the [setup script](./scripts/setup.ts) by running this command.

	 ```bash
	 bun scripts/setup.ts
	 ```

	 > Most of the values are already set to defaults that should work right away unless you've had to modify any of the services' environments (e.g. changed port numbers or database credentials, etc...)

5. Start the external services required to run docware.

	 ```bash
	 bun services:up
	 ```

	 This uses docker compose to start all the external services required by docware. You can have a look at this [docker-compose.yml](./docker-compose.yml) file to exactly what services are run

6. Migrate the database.

	 ```bash
	 turbo db:push
	 ```

5. Start the development server:

	 ```bash
	 bun run dev
	 ```

	 This will use Turborepo to run all development servers. Refer to the [contributing guidline](./CONTRIBUTING.md) to read about this in detail.

7. Access the applications:

	 | Name | URL |
	 |------|-----|
	 | Landing Page | [`http://localhost:4321`](http://localhost:4321) |
	 | API | [`http://localhost:5000`](http://localhost:5000) |
	 | App | [`http:localhost:3000`](http://localhost:3000) |
	 | Auth App | [`http://localhost:3001`](http://localhost:3001) |
	 | Database server | `postgres://root@localhost:5432/postgres?schema=public` |
	 | Minio API | [`http://localhost:9000`](http://localhost:9000) |
	 | Minio Console | [`http://localhost:9001`](http://localhost:9001) |

	 > Should the case be that you needed to modify any port numbers, then you'll use those values to access the application.

### Contributing

We welcome contributions from the community! If you're interested in contributing to Docware, please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for more information on how to get started.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](./LICENSE) file for details.

**Important**: The AGPL-3.0 license applies exclusively to the Docware software itself. We do not repackage or redistribute any third-party libraries or dependencies. All external dependencies maintain their original licenses - please refer to their respective repositories and documentation for their specific license information.

---

<div align='center'>
	<sub>Developed with ❤️ by <a href="https://lebophoshoko.dedyn.io">Lebogang Phoshoko</a></sub>
</div>

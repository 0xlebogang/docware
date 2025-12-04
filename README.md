<div align='center'>

# DOCWARE

![Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![License](https://img.shields.io/badge/license-AGPL--3.0-blue)
![pnpm](https://img.shields.io/badge/package%20manager-pnpm-red)
![uv](https://img.shields.io/badge/package%20manager-uv-yellow)

A unified documentation solution that consolidates all your project's documentation, both internal and external, into a single, convenient interface.

</div>

> This project is currently under active development and the documentation might not be as accurate as it should be.
>
> _Sorry in advance_

## Overview

Docware is a comprehensive documentation aggregation platform designed to streamline access to project documentation. By leveraging web scraping and AI-powered content restructuring, it consolidates documentation sources into a unified, searchable interface. This approach eliminates the need to navigate multiple documentation sites, providing developers with a single source of truth for all project-related information.

The platform is actively evolving with continuous improvements to enhance accuracy and user experience.

## Getting Started

To get Docware up and running for development purposes, follow these steps:

### Prerequisites

We use [mise](https://mise.jdx.dev) to manage the project's tooling. You can either use mise or [manually](#manual) install the required tools.

> [git](https://git-scm.com/downloads) is also required to clone the repository. (should we even mention this? :D)

#### Setup mise for tool management (recommended)

> This guide assumes you already have the latest stable version of [docker & docker compose](https://docs.docker.com/get-docker/) installed on your system.

1. Follow the instructions [here](https://mise.jdx.dev/getting-started.html#installing-mise-cli) to install mise.
2. Setup mise to manage your `PATH` variables while in the project directory by following the instructions [here](https://mise.jdx.dev/getting-started.html#activate-mise). (optional but recommended)
	> Otherwise, you need to prefix all commands that use the tools installed by mise with `mise x --`. For example, instead of running `pnpm install`, you would run `mise x -- pnpm install`.
3. Skip to [running the project](#running-the-project).

#### Manual tool management

Ensure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/en/download/) (v20 or higher)
- [PNPM](https://pnpm.io/installation) (v10 or higher)
- [UV](https://uv.jdx.dev/getting-started/installation) (v0.9 or higher)
- [Python](https://www.python.org/downloads/) (v3.12 or higher)
- [Ruff](https://ruff.rs/docs/install/) (latest stable version) [optional, for linting Python code, can be installed via `pip install ruff` or `uv add ruff` from the project root]
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (latest stable versions)

### Running the Docware project

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
	 mise install
	 ```

	 If you are managing tools manually, ensure you have installed all the [prerequisites](#manual-tool-management) listed above.

3. Install project dependencies:

	 ```bash
	 pnpm install
	 ```

4. Setup environment variables:

	 Each service has its own `.env.example` file located in its respective directory. Copy these files to create `.env` files and configure them as needed.

5. Start the external development services:

	 In the project root, run:

	 ```bash
	 pnpm run services:up
	 ```

	 Refer to the [docker-compose.dev.yml](./docker-compose.dev.yml) to see the services that will be started.

	 > Should you have limited resources on your machine. Feel free to manually run only the services you need  via `docker compose up -d <service_name>`.

6. Start the development server:

	 In the project root, run:

	 > This assumes that all required services are up and running.

	 ```bash
	 pnpm run dev
	 ```

	 or

	 To start a specific package, run:

	 > Ensure the required services for that package are up and running.

	 ```bash
	 pnpm run dev --filter=<package_name>
	 ```

7. Access the application:

	| Name | URL |
	|------|-----|
	| Main web app | [`http://localhost:3000`](http://localhost:3000) |
	| Authentication app | [`http://localhost:3001`](http://localhost:3001) |

### Contributing

We welcome contributions from the community! If you're interested in contributing to Docware, please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) guide for more information on how to get started.

## License

This project is licensed under the AGPL-3.0 License. See the [LICENSE](./LICENSE) file for details.

**Important**: The AGPL-3.0 license applies exclusively to the Docware software itself. We do not repackage or redistribute any third-party libraries or dependencies. All external dependencies maintain their original licenses - please refer to their respective repositories and documentation for their specific license information.

---

<div align='center'>
	<sub>Developed with ❤️ by <a href="https://linkedin.com/in/phoshokoml">Lebogang Phoshoko</a></sub>
</div>

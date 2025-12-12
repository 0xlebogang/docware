/**
 * This script sets up .env files for each app/package by copying the .env.example files in
 * respective package's directory to .env files, if they do not already exist.
 *
 * Usage:
 * - Run this script right after installing the project dependencies, before starting the
 * 	 development servers.
 * - Run the script from the root of the project (same location as `README.md`) using:
 *   ```bash
 *   bun scripts/setup.ts
 *   ```
 */

import fs from "node:fs";

function main() {
	// Find all .env.example file in the project
	const files = fs.readdirSync("./", { withFileTypes: true, recursive: true });

	// Filter all .env.example files excluding node_modules
	const envExampleFiles = files.filter(
		(file) =>
			// Exclude node_modules directory
			!file.parentPath.includes("node_modules") &&
			// Check if it's a file and named .env.example
			file.isFile() &&
			file.name === ".env.example",
	);

	// Copy each .env.example file to a .env if it does not exist
	envExampleFiles.forEach((file) => {
		const src = `${file.parentPath}/${file.name}`;
		const dest = `${file.parentPath}/.env`;
		if (!fs.existsSync(dest)) {
			fs.copyFileSync(src, dest);
			console.log(`Created ${dest} from ${src}`);
		}
	});

	process.exit(0);
}

main();

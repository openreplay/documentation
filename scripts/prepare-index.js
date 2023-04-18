import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceDir = path.join(__dirname, '..', 'src', 'pages');

function readFilesRecursively(directory) {
	const files = [];
	const entries = fs.readdirSync(directory, { withFileTypes: true });

	entries.forEach((entry) => {
		if (entry.isDirectory()) {
			files.push(...readFilesRecursively(path.join(directory, entry.name)));
		} else if (entry.isFile() && entry.name.endsWith('.mdx')) {
			files.push(path.join(directory, entry.name));
		}
	});

	return files;
}

const inputPaths = readFilesRecursively(sourceDir);
const indexData = inputPaths.map((filePath) => {
	const pathParts = path.relative(sourceDir, filePath).split(path.sep);
	const language = pathParts[0];
	const version = pathParts[1].startsWith('v') ? pathParts[1] : '_latest_';
	// const section = pathParts[2];

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const {
		data: { title, excerpt, tags },
		content,
	} = matter(fileContent);

	const slug = path
		.relative(sourceDir, filePath)
		.replace(/\\/g, '/')
		.replace(/\.mdx$/, '');

	return {
		slug,
		category: 'documentation',
		title: title,
		excerpt: excerpt,
		tags: tags,
		body: content,
		version,
		lang: language,
	};
});

// fs.writeFileSync('public/search-index.json', JSON.stringify(indexData, null, 2));
fs.writeFileSync('public/search-index.json', JSON.stringify(indexData));

import fs from 'fs/promises';
import path from 'path';
import { ArticleType } from '../types';

/*
  1. Loop over the files in data/articles
  2. As Id and the data that are exported from them as the metadata.
*/

const getAllArticles = async (): Promise<ArticleType[]> => {
	const dir = await fs.opendir(path.join(process.cwd(), 'pages/articles'));

	const articles: ArticleType[] = [];

	for await (const dirrent of dir) {
		if (dirrent.name !== 'index.tsx') {
			const { metaData } = await import(`../pages/articles/${dirrent.name}`);

			const content = await fs.readFile(
				path.join(process.cwd(), `pages/articles/${dirrent.name}`),
				'utf-8',
			);

			const timeToRead = Math.round(
				content.slice(content.indexOf('\n##')).split(' ').length / 200,
			);
			const id = dirrent.name.slice(0, dirrent.name.lastIndexOf('.'));

			articles.push({ id, timeToRead, ...metaData });
		}
	}

	articles.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return articles;
};

export default getAllArticles;

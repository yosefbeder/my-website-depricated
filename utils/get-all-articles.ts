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

			articles.push(metaData);
		}
	}

	articles.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return articles;
};

export default getAllArticles;

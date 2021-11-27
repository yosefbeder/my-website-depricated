export interface ArticleType {
	id: string;
	title: string;
	tags: string[];
	description: string;
	date: string;
	timeToRead: number;
}

export interface FullArticleType extends ArticleType {
	markdown: string;
}

export interface ErrorType {
	status: number;
	message: string;
}

export interface HeaderType {
	id: string;
	depth: number;
	content: string;
}

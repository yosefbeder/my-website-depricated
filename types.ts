export interface ArticleType {
  imgSrc: string;
  id: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}

export interface FullArticleType extends ArticleType {
  markdown: string;
}
export interface ErrorType {
  status: number;
  message: string;
}

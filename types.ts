export interface ArticleType {
  id: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}

export interface ErrorType {
  status: number;
  message: string;
}

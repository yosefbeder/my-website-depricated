import { NextApiRequest, NextApiResponse } from 'next';
import { articles, getArticles } from '.';
import { ErrorType } from '../../../types';
import isAuthorized from '../../../utils/is-authorized';
import fs from 'fs/promises';
import path from 'path';
import { ArticlePageProps } from '../../articles/[id]';

export const getArticle = async (id: string): Promise<ArticlePageProps> => {
  const article = articles.find(article => article.id === id);

  if (!article)
    throw { status: 404, message: "There's not article with this id" };

  const markdown = await fs.readFile(
    path.join(process.cwd(), `/data/articles/${id}.md`),
    'utf-8',
  );

  return { ...article, markdown };
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const article = await getArticle(req.query.id as string);

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res
      .status((err as ErrorType).status)
      .json({ success: false, error: (err as ErrorType).message });
  }
};

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const adminId = req.headers['admin-id'] as string | undefined;
  const id = req.query.id;

  try {
    isAuthorized(adminId);

    const index = articles.findIndex(article => article.id === id);

    if (index === -1)
      throw { status: 404, message: "There's not article with this id" };

    const newArticles = [
      ...articles.slice(0, index),
      ...articles.slice(index + 1),
    ];

    try {
      await fs.writeFile(
        path.join(process.cwd(), '/data/articles.json'),
        JSON.stringify(newArticles),
      );

      await fs.unlink(path.join(process.cwd(), `/data/articles/${id}.md`));
      await fs.unlink(
        path.join(process.cwd(), `/public/images/articles/${id}.jpg`),
      );
    } catch (err) {
      throw {
        status: 500,
        message: "Couldn't remove all of the assets from the database",
      };
    }

    articles.splice(index, 1);

    res.status(200).json({ success: true, data: null });
  } catch (err) {
    res
      .status((err as ErrorType).status)
      .json({ success: false, error: (err as ErrorType).message });
  }
};

const hanlder = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHandler(req, res);
  else if (req.method === 'DELETE') deleteHandler(req, res);
  else
    res.status(405).json({
      success: false,
      error: `${req.method} Requests aren't allowed for this resource`,
    });
};

export default hanlder;

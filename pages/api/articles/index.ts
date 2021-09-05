import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { ArticleType, ErrorType } from '../../../types';
import validate from 'validate.js';
import fetch from 'node-fetch';
import isAuthorized from '../../../utils/is-authorized';

const generateId = (title: string) => title.toLowerCase().replace(/\s/g, '-');

const downloadImage = async (url: string, des: string) => {
  const response = await fetch(url);
  const buffer = await response.buffer();

  await fsPromises.writeFile(des, buffer);
};

export const articles: ArticleType[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '/data/articles.json'), 'utf-8'),
);

export const getArticles = (tags?: string[]) => {
  if (tags) {
    let result = articles;

    tags.forEach(tag => {
      result = result.filter(({ tags }) => tags.includes(tag));
    });

    return result;
  } else {
    return articles;
  }
};

const getHanlder = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.tags) {
    let tags = (req.query.tags as string).split(',');

    res.status(200).json({ success: true, data: getArticles(tags) });
  } else {
    res.status(200).json({ success: true, data: getArticles() });
  }
};

interface ReqSchema {
  imgSrc: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

const reqSchema = {
  imgSrc: { type: 'string', presence: true },
  title: { type: 'string', presence: true },
  description: { type: 'string', presence: true },
  tags: { type: 'array', presence: true },
  content: { type: 'string', presence: true },
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const adminId = req.headers['admin-id'] as string | undefined;

  try {
    isAuthorized(adminId);

    if (validate(req.body, reqSchema))
      throw {
        status: 400,
        message: 'Please check the format of the request body',
      };

    const { imgSrc, title, description, tags, content } = req.body as ReqSchema;

    const id = generateId(title);

    if (articles.find(article => article.id === id))
      throw {
        status: 400,
        message: "There's already an article with this title",
      };

    const date = new Date().toISOString();

    try {
      const newArticle = {
        id,
        date,
        title,
        description,
        tags,
      };

      articles.push(newArticle);

      await downloadImage(
        imgSrc,
        path.join(process.cwd(), `/public/images/articles/${id}.jpg`),
      );

      await fsPromises.writeFile(
        path.join(process.cwd(), `/data/articles/${id}.md`),
        content,
      );

      await fsPromises.writeFile(
        path.join(process.cwd(), 'data/articles.json'),
        JSON.stringify(articles),
      );

      res.status(201).json({ success: true, data: null });
    } catch (err) {
      articles.pop();

      res.status(500).json({
        success: false,
        error: "Couldn't upload the article to the server",
      });
    }
  } catch (err) {
    res
      .status((err as ErrorType).status)
      .json({ success: false, error: (err as ErrorType).message });
  }
};

const hanlder = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') getHanlder(req, res);
  else if (req.method === 'POST') postHandler(req, res);
  else
    res.status(405).json({
      success: false,
      error: `${req.method} Requests aren't allowed for this resource`,
    });
};

export default hanlder;

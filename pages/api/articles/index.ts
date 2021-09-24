import { NextApiRequest, NextApiResponse } from 'next';
import validate from 'validate.js';
import isAuthorized from '../../../utils/is-authorized';
import { getAllArticles, postArticle } from '../../../utils/mongodb';

const generateId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[\/.?=&:#]+/g, '')
    .replace(/\s/g, '-');

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ success: true, data: await getAllArticles() });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

export interface ReqSchema {
  imgSrc: string;
  title: string;
  description: string;
  tags: string[];
  markdown: string;
}

const reqSchema = {
  imgSrc: { type: 'string', presence: true },
  title: { type: 'string', presence: true },
  description: { type: 'string', presence: true },
  tags: { type: 'array', presence: true },
  markdown: { type: 'string', presence: true },
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await isAuthorized(req.headers['admin-id'] as string | undefined);
  } catch (err) {
    res.status(401).json({ success: false, error: (err as Error).message });
  }

  if (validate(req.body, reqSchema)) {
    res.status(400).json({
      success: false,
      error: 'Please check the format of the request',
    });
    return;
  }

  const { imgSrc, title, description, tags, markdown } = req.body as ReqSchema;
  const id = generateId(title);
  const date = new Date().toISOString();

  try {
    const article = { id, imgSrc, title, date, description, tags, markdown };

    await postArticle(article);

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

const hanlder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') await getHandler(req, res);
  else if (req.method === 'POST') await postHandler(req, res);
  else
    res.status(405).json({
      success: false,
      error: `${req.method} Requests aren't allowed for this resource`,
    });
};

export default hanlder;

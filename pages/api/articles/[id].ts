import { NextApiRequest, NextApiResponse } from 'next';
import isAuthorized from '../../../utils/is-authorized';
import { deleteArticle, getArticle } from '../../../utils/mongodb';

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const article = await getArticle(req.query.id as string);

    res.status(200).json({ success: true, data: article });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, error: "There's no article with this id" });
  }
};

const deleteHanlder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await isAuthorized(req.headers['admin-id'] as string | undefined);
  } catch (err) {
    res.status(401).json({ success: false, error: (err as Error).message });
  }

  try {
    await deleteArticle(req.query.id as string);
    res.status(200).json({ success: true, data: null });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
};

const hanlder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') await getHandler(req, res);
  if (req.method === 'DELETE') await deleteHanlder(req, res);
  else
    res.status(405).json({
      success: false,
      error: `${req.method} Requests aren't allowed for this resource`,
    });
};

export default hanlder;

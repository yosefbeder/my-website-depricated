import { Db, MongoClient } from 'mongodb';
import { ArticleType, FullArticleType } from '../types';

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ozopi.mongodb.net/my-personal-website-db?retryWrites=true&w=majority`;

let cached: Db;

const getDb = async () => {
  if (cached) {
    return cached;
  } else {
    const client = new MongoClient(uri);

    await client.connect();

    const db = await client.db();

    cached = db;
    return db;
  }
};

export const getArticles = async (tags?: string[]): Promise<ArticleType[]> => {
  try {
    const db = await getDb();
    const articles = db.collection('articles');

    const query = tags ? { tags } : {};

    const docs = await articles.find(query).toArray();

    return docs.map(({ markdown, _id, ...article }) => article as ArticleType);
  } catch (err) {
    throw new Error("Couldn't read articles from the database");
  }
};

export const getArticle = async (id: string): Promise<FullArticleType> => {
  const db = await getDb();
  const articles = db.collection('articles');

  let doc = await articles.findOne({ id });

  if (doc) {
    const { _id, ...article } = doc;

    return article as FullArticleType;
  } else {
    throw new Error("There's no article with this id");
  }
};

export const postArticle = async (article: FullArticleType) => {
  const db = await getDb();
  const articles = db.collection('articles');

  if (await articles.findOne({ id: article.id })) {
    throw new Error("There's already an article with this title");
  } else await articles.insertOne(article);
};

export const deleteArticle = async (id: string) => {
  const db = await getDb();
  const articles = db.collection('articles');

  const acn = await articles.findOneAndDelete({ id });

  if (!acn.value) throw new Error("There's no aritcle with this id");
};

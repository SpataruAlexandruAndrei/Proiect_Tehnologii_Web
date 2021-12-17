import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getAllFeedbacksByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open('./mydb.sqlite');
    const allFeedbacks = await db.all('select * from feedback where personId = ?', [req.query.id]);
    res.json(allFeedbacks);
} 
import { NextApiRequest, NextApiResponse } from 'next';
import sqlite from 'sqlite';

export default async function getFeedbackById(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open('./mydb.sqlite');
    const feedback = await db.get('select * from feedback where id = ?', [req.query.id]);
    res.json(feedback);
} 
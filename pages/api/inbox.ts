import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

interface EmailData {
  to: string;
  from: string;
  subject: string;
  time: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      error: 'Parameter email diperlukan',
      status: 'error',
    });
  }

  try {
    const { db } = await connectToDatabase();

    const emails = await db
      .collection('emails')
      .find<EmailData>({ to: email })
      .sort({ time: -1 })
      .toArray();

    res.status(200).json({
      data: emails,
      status: 'success',
      count: emails.length,
    });
  } catch (err) {
    const error = err as Error;
    console.error('❌ Error API Inbox:', error);
    res.status(500).json({
      error: 'Gagal mengambil data email',
      detail: error.message,
      status: 'error',
    });
  }
}

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
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Metode tidak diizinkan',
      status: 'error',
    });
  }

  try {
    const { to, from, subject } = req.body as {
      to?: string;
      from?: string;
      subject?: string;
    };

    if (!to || !from || !subject) {
      return res.status(400).json({
        error: 'Data email tidak lengkap',
        status: 'error',
        missing: {
          to: !to,
          from: !from,
          subject: !subject,
        },
      });
    }

    const newMail: EmailData = {
      to,
      from,
      subject,
      time: new Date().toISOString(),
    };

    const { db } = await connectToDatabase();
    const result = await db.collection('emails').insertOne(newMail);

    return res.status(200).json({
      message: 'Email berhasil disimpan! 📨',
      status: 'success',
      data: {
        ...newMail,
        _id: result.insertedId,
      },
    });
  } catch (err) {
    console.error('❌ Error API Send:', err);
    return res.status(500).json({
      error: 'Gagal menyimpan email',
      detail: err instanceof Error ? err.message : 'Unknown error',
      status: 'error',
    });
  }
}

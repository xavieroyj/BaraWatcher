import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { address, userId } = JSON.parse(req.body);

    if (!address || !userId) {
      return res.status(400).json({ error: 'Address and userId are required.' });
    }

    try {
      const wallet = await prisma.wallet.create({
        data: {
          address,
          userId,
        },
      });

      res.status(200).json({ wallet });
    } catch (error) {
      console.error('Error linking wallet:', error);
      res.status(500).json({ error: 'Failed to link wallet.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

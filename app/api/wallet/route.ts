import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { headers } from 'next/headers'
import prisma from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

// Schema for wallet connection request
const walletConnectSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
})

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { address } = walletConnectSchema.parse(body)

    // Check if wallet is already connected to another user
    const existingWallet = await prisma.wallet.findUnique({
      where: { address },
    })

    if (existingWallet && existingWallet.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Wallet already connected to another account' },
        { status: 400 }
      )
    }

    // Create or update wallet connection
    let wallet;
    if (existingWallet) {
      wallet = await prisma.wallet.update({
        where: { address },
        data: {
          isConnected: true,
          lastActive: new Date(),
        },
      })
    } else {
      wallet = await prisma.wallet.create({
        data: {
          id: uuidv4(),
          address,
          userId: session.user.id,
          isConnected: true,
        },
      })
    }

    return NextResponse.json({ wallet })
  } catch (error) {
    console.error('Error in POST /api/wallet:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Verify wallet belongs to user
    const wallet = await prisma.wallet.findFirst({
      where: {
        address,
        userId: session.user.id,
      },
    })

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found or unauthorized' },
        { status: 404 }
      )
    }

    // Update wallet connection status
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        isConnected: false,
        lastActive: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all wallets for the user
    const wallets = await prisma.wallet.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        lastActive: 'desc',
      },
    })

    return NextResponse.json({ wallets })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

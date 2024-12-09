import { useState, useCallback } from 'react'
import { createAuthClient } from 'better-auth/react';

interface Wallet {
  id: string
  address: string
  isConnected: boolean
  connectedAt: string
  lastActive: string
}

const { useSession } = createAuthClient()

export function useWallet() {
  const {
    data: session,
    isPending, //loading state
    error //error object
  } = useSession();
  const [isConnecting, setIsConnecting] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)

  const connectWallet = useCallback(async () => {
    console.log('Debug:', { hasMetaMask: !!window.ethereum, hasSession: !!session })
    if (!window.ethereum || !session) {
      setErrorState('MetaMask not installed or user not logged in')
      return null
    }

    setIsConnecting(true)
    setErrorState(null)

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const address = accounts[0]

      // Send to our API
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect wallet')
      }

      return data.wallet
    } catch (err) {
      setErrorState(err instanceof Error ? err.message : 'Failed to connect wallet')
      return null
    } finally {
      setIsConnecting(false)
    }
  }, [session])

  const disconnectWallet = useCallback(async (address: string) => {
    if (!session) {
      setErrorState('User not logged in')
      return false
    }

    try {
      const response = await fetch(`/api/wallet?address=${address}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to disconnect wallet')
      }

      return true
    } catch (err) {
      setErrorState(err instanceof Error ? err.message : 'Failed to disconnect wallet')
      return false
    }
  }, [session])

  const getConnectedWallets = useCallback(async () => {
    if (!session) {
      setErrorState('User not logged in')
      return []
    }

    try {
      const response = await fetch('/api/wallet')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch wallets')
      }

      return data.wallets as Wallet[]
    } catch (err) {
      setErrorState(err instanceof Error ? err.message : 'Failed to fetch wallets')
      return []
    }
  }, [session])

  return {
    connectWallet,
    disconnectWallet,
    getConnectedWallets,
    isConnecting,
    error: errorState,
    isPending,
  }
}

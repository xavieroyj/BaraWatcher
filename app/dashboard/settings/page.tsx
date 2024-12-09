"use client"

import React, { useState, useEffect } from 'react';
// import { ethers } from "ethers";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWallet } from '@/hooks/useWallet';
import { Loader2 } from 'lucide-react';

const SettingsPage = () => {
  const { connectWallet, disconnectWallet, getConnectedWallets, isConnecting, error, isPending } = useWallet();
  const [connectedWallet, setConnectedWallet] = useState<{ address: string; isConnected: boolean } | null>(null);

  useEffect(() => {
    const fetchWallets = async () => {
      const wallets = await getConnectedWallets();
      const activeWallet = wallets.find(w => w.isConnected);
      if (activeWallet) {
        setConnectedWallet({
          address: activeWallet.address,
          isConnected: activeWallet.isConnected
        });
      }
    };

    if (!isPending) {
      fetchWallets();
    }
  }, [getConnectedWallets, isPending]);

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setConnectedWallet({
        address: wallet.address,
        isConnected: wallet.isConnected
      });
    }
  };

  const handleDisconnect = async () => {
    if (connectedWallet) {
      const success = await disconnectWallet(connectedWallet.address);
      if (success) {
        setConnectedWallet(null);
      }
    }
  };

  if (isPending) {
    return (
      <div className="p-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="text-center text-red-600 text-sm">{error}</p>
          )}
          
          {connectedWallet ? (
            <div className="space-y-2">
              <p className="text-center text-green-600">
                Wallet Connected: 
                <span className="font-mono text-sm block mt-1">{connectedWallet.address}</span>
              </p>
              <Button 
                onClick={handleDisconnect} 
                variant="destructive"
                className="w-full"
              >
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleConnect} 
              className="w-full"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect MetaMask Wallet'
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;

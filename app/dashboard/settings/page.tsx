"use client"

import React, { useState } from 'react';
// import { ethers } from "ethers";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage = () => {
  // const provider = new ethers.BrowserProvider(window.ethereum);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        // Here you would send the address to your backend to link with the user's account
        // Example: await fetch('/api/link-wallet', { method: 'POST', body: JSON.stringify({ address }) });
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask and try again.');
    }
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {walletAddress ? (
            <p className="text-center text-green-600">Wallet Connected: <span className="font-mono text-sm">{walletAddress}</span></p>
          ) : (
            <Button onClick={connectWallet} className="w-full">Connect MetaMask Wallet</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;

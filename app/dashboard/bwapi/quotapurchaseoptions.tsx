import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Web3Provider } from "@ethersproject/providers"

const quotaOptions = [
  { amount: 10, price: 0 },
  { amount: 10000, price: 2.99 },
  { amount: 50000, price: 13.99 },
]

// Define the props type for the component
type QuotaPurchaseOptionsProps = {
  setQuota: React.Dispatch<React.SetStateAction<{ used: number; total: number } | null>>;
};

export function QuotaPurchaseOptions({ setQuota }: QuotaPurchaseOptionsProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async (amount: number, price: number) => {
    console.log(price); 
    setIsPurchasing(true)
    try {
      if (amount == 10) {

      }
      if (window.ethereum && amount > 10) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        console.log("Connected account:", accounts[0])
        const provider = new Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const tx = await signer.sendTransaction({ to: accounts[0], value: 0 })
        console.log("Transaction hash:", tx.hash)
      }
      toast({
        title: "Purchase Successful",
        description: `You've added ${amount} requests to your quota.`,
      })
      setQuota((prev) =>
        prev ? { ...prev, total: prev.total + amount } : { used: 0, total: amount }
      )
    } catch (error) {
      console.error("Purchase failed:", error)
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quotaOptions.map((option, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{option.amount} Requests</CardTitle>
            <CardDescription>${option.price.toFixed(2)}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add {option.amount} API requests to your quota.</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handlePurchase(option.amount, option.price)}
              disabled={isPurchasing}
              className="w-full"
            >
              {isPurchasing ? "Processing..." : "Purchase"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

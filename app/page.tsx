import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Award, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Combat<span className="text-primary">Malfoy</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          A decentralized platform for identifying and combating scams through community-driven peer reviews and trust scores.
        </p>
        <div className="mt-8">
          <Link href="/dashboard">
            <Button size="lg" className="mr-4">Get Started</Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="outline" size="lg">Connect Wallet</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Trust Score System</CardTitle>
              <CardDescription>
                Build reputation by accurately identifying scams and helping others stay safe.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Award className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Token Rewards</CardTitle>
              <CardDescription>
                Earn tokens for every verified correct scam identification and review.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Credit Score</CardTitle>
              <CardDescription>
                Increase your credibility score through consistent and accurate reviews.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Community Driven</CardTitle>
              <CardDescription>
                Join a network of vigilant reviewers protecting the community from scams.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Submit Reviews</h3>
            <p className="text-muted-foreground">
              Review potential scams and provide detailed analysis to help the community.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Trust</h3>
            <p className="text-muted-foreground">
              Build your trust score through accurate reviews verified by main reviewers.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Rewarded</h3>
            <p className="text-muted-foreground">
              Receive token rewards for contributing to the safety of our community.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

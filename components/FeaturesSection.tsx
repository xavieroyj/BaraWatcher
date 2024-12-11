import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Award, TrendingUp, Users } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:scale-105 transition-all border-red-500 border-2">
          <CardHeader>
            <Shield className="w-10 h-10 text-primary mb-2" color="red" />
            <CardTitle>Trust Score System</CardTitle>
            <CardDescription>
              Build reputation by accurately identifying scams and helping others stay safe.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:scale-105 transition-all border-orange-500 border-2">
          <CardHeader>
            <Award className="w-10 h-10 text-primary mb-2 " color="orange"/>
            <CardTitle>Token Rewards</CardTitle>
            <CardDescription>
              Earn tokens for every verified correct scam identification and review.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:scale-105 transition-all border-green-500 border-2">
          <CardHeader>
            <TrendingUp className="w-10 h-10 text-primary mb-2" color="green"/>
            <CardTitle>Credit Score</CardTitle>
            <CardDescription>
              Increase your credibility score through consistent and accurate reviews.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:scale-105 transition-all border-blue-500 border-2">
          <CardHeader>
            <Users className="w-10 h-10 text-primary mb-2" color="blue" />
            <CardTitle>Community Driven</CardTitle>
            <CardDescription>
              Join a network of vigilant reviewers protecting the community from scams.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
} 
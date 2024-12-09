export default function HowItWorksSection() {
  return (
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
  )
} 
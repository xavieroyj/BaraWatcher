import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import ValidationForm from "@/components/validation-form"

// Mock data - replace with API call
const noteData = {
  id: 1,
  content: "Is this claim about AI true?",
  type: "question",
  status: "pending",
  credibilityScore: 45,
  imageUrl: "https://placehold.co/600x400",
  notes: [
    {
      id: 1,
      text: "This needs verification from AI experts",
      volunteerName: "John Doe",
      date: "2024-01-10",
    }
  ]
}

export default function NotePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Validation</h1>
        <Badge variant="outline" className="text-base">
          ID: {params.id}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Preview Section */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content Preview</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src="https://placehold.co/600x400"
              alt="Content preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-500">Content</h3>
              <p>{noteData.content}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Type</h3>
                <Badge variant="outline">{noteData.type}</Badge>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Status</h3>
                <Badge>{noteData.status}</Badge>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Credibility Score</h3>
                <span className={`font-medium ${
                  noteData.credibilityScore < 50 ? 'text-red-500' : 'text-green-500'
                }`}>
                  {noteData.credibilityScore}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Validation Section */}
        <ValidationForm notes={noteData.notes} />
      </div>
    </div>
  )
}

'use client'

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// This would come from your API
const flaggedItems = [
  {
    id: 1,
    content: "Is this claim about AI true?",
    type: "question",
    status: "pending",
    credibilityScore: 45,
    requestCount: 3,
    submissionDate: "2024-01-10",
    notes: [
      {
        id: 1,
        text: "This needs verification from AI experts",
        volunteerName: "John Doe",
      }
    ]
  },
  {
    id: 2,
    content: "https://example.com/suspicious-article",
    type: "link",
    status: "debunked",
    credibilityScore: 15,
    requestCount: 8,
    submissionDate: "2024-01-09",
    notes: [
      {
        id: 2,
        text: "Article contains misleading information",
        volunteerName: "Jane Smith",
      }
    ]
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "yellow"
    case "validated":
      return "green"
    case "debunked":
      return "red"
    default:
      return "gray"
  }
}

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Flagged Content Dashboard</h1>
      </div>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Credibility Score</TableHead>
              <TableHead>Requests</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Latest Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flaggedItems.map((item) => (
              <TableRow 
                key={item.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/dashboard/notes/${item.id}`)}
              >
                <TableCell className="max-w-[300px] truncate">
                  {item.content}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    item.credibilityScore < 50 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {item.credibilityScore}%
                  </span>
                </TableCell>
                <TableCell>{item.requestCount}</TableCell>
                <TableCell>{item.submissionDate}</TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="truncate">
                    <p className="text-sm text-gray-500">{item.notes[0]?.text}</p>
                    <p className="text-xs text-gray-400">by {item.notes[0]?.volunteerName}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
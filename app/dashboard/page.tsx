'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { getNotes } from "@/app/actions/note"
import { Loader2 } from "lucide-react"

interface Note {
  id: number
  content: string
  type: string
  status: string
  credibilityScore: number
  createdAt: Date
  comments: Array<{
    id: number
    text: string
    volunteerName: string
    date: Date
  }>
}

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
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNotes() {
      try {
        setIsLoading(true)
        const result = await getNotes()
        if (result.error) {
          throw new Error(result.error)
        }
        setNotes(result.notes ?? [])
      } catch (err) {
        console.error('Error fetching notes:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch notes')
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 min-h-[200px] flex items-center justify-center">
        {error}
      </div>
    )
  }

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
              <TableHead>Date</TableHead>
              <TableHead>Latest Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow 
                key={note.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/dashboard/notes/${note.id}`)}
              >
                <TableCell className="max-w-[300px] truncate">
                  {note.content}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{note.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge>{note.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    note.credibilityScore < 50 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {note.credibilityScore}%
                  </span>
                </TableCell>
                <TableCell>{new Date(note.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="max-w-[300px]">
                  {note.comments[0] && (
                    <div className="truncate">
                      <p className="text-sm text-gray-500">{note.comments[0].text}</p>
                      <p className="text-xs text-gray-400">by {note.comments[0].volunteerName}</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
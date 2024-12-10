"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: number 
  text: string
  volunteerName: string
  date: string
}

interface ValidationFormProps {
  notes: Note[]
}

export default function ValidationForm({ notes }: ValidationFormProps) {
  const [rejectionNote, setRejectionNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleValidation = async (isValid: boolean) => {
    if (!isValid && !rejectionNote.trim()) {
      alert("Please provide a reason for declining the content")
      return
    }

    setIsSubmitting(true)
    try {
      // Replace with your API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(isValid ? "Content accepted!" : "Content declined with note")
      // Redirect or update UI
    } catch (error) {
      console.error("Error submitting validation:", error)
      alert("Failed to submit validation")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Validation</h2>
      
      <div className="space-y-4">
        <h3 className="font-medium text-gray-500">Current Notes</h3>
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm">{note.text}</p>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>by {note.volunteerName}</span>
              <span>{note.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-500">Your Response</h3>
        <div className="space-y-4" id="validation-form">
          <Textarea
            placeholder="If declining, please explain why the content is incorrect..."
            className="min-h-[100px]"
            value={rejectionNote}
            onChange={(e) => setRejectionNote(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="flex gap-4">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => handleValidation(true)}
              disabled={isSubmitting}
            >
              Accept
            </Button>
            <Button 
              className="w-full" 
              variant="destructive"
              onClick={() => handleValidation(false)}
              disabled={isSubmitting}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
} 
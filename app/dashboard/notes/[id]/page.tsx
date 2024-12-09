'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Upload, X } from 'lucide-react'
import ValidationForm from "@/components/validation-form"
import { Input } from '@/components/ui/input'

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

function FileUpload({ 
  file, 
  onFileSelect, 
  onRemove 
}: { 
  file: string | null, 
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onRemove: () => void 
}) {
  return file ? (
    <div className="relative w-full h-full">
      <Image
        src={file}
        alt="Content preview"
        fill
        className="object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  ) : (
    <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="h-10 w-10 text-gray-400 mb-3" />
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 100MB</p>
      </div>
      <input 
        type="file" 
        className="hidden" 
        onChange={onFileSelect}
        accept="image/*"
      />
    </label>
  )
}

export default function NotePage({ params }: { params: { id: string } }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(noteData.imageUrl)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setSelectedFile(fileUrl)
    }
  }

  const handleFileRemove = () => {
    setSelectedFile(null)
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Validation</h1>
        {/* <Badge variant="outline" className="text-base">
          ID: {params.id}
        </Badge> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Preview Section */}
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content Preview</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <FileUpload 
              file={selectedFile}
              onFileSelect={handleFileSelect}
              onRemove={handleFileRemove}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-500">What is this about</h3>
              <Input/>
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

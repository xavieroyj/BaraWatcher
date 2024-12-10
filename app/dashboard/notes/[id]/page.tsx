"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Divide, Upload, X } from "lucide-react";
import ValidationForm from "@/components/validation-form";
import { Input } from "@/components/ui/input";
import { getValidationRequestById } from "@/app/actions/validationRequest";
import { useToast } from "@/hooks/use-toast";

interface ValidationRequestData {
  id: number;
  content: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

function FileUpload({
  file,
  onFileSelect,
  onRemove,
}: {
  file: string | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
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
          <span className="font-semibold">Click to upload</span> or drag and
          drop
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
  );
}

export default function NotePage({ params }: { params: { id: string } }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<ValidationRequestData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getValidationRequestById(Number(params.id));
        if (data) {
          setRequestData(data as ValidationRequestData);
        } else {
          toast({
            title: "Error",
            description: "Validation request not found",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch validation request",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(fileUrl);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  if (loading) {
    return <div className="container mx-auto py-6">Loading...</div>;
  }

  if (!requestData) {
    return (
      <div className="container mx-auto py-6">Validation request not found</div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Validation</h1>
        <Badge variant="outline" className="text-base">
          ID: {requestData.id}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">Content Preview</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {
              requestData.type != "IMAGE" ? 
              <FileUpload
                file={selectedFile}
                onFileSelect={handleFileSelect}
                onRemove={handleFileRemove}
              /> : <Image src={requestData.content} alt="image" className="w-full h-full" width={100} height={100}/>
            }
          </div>
          <div className="space-y-4">
            {requestData.type != "IMAGE" ? (
              <div>
                <h3 className="font-medium text-gray-500">Content</h3>
                <p className="mt-2 text-sm">{requestData.content}</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Type</h3>
                <Badge variant="outline">{requestData.type}</Badge>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Status</h3>
                <Badge
                  variant={
                    requestData.status === "PENDING"
                      ? "outline"
                      : requestData.status === "VALIDATED"
                      ? "default"
                      : "destructive"
                  }
                >
                  {requestData.status}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Created</h3>
                <p className="text-sm">
                  {new Date(requestData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <ValidationForm
          notes={[]}
          // requestId={requestData.id}
          // currentStatus={requestData.status}
        />
      </div>
    </div>
  );
}

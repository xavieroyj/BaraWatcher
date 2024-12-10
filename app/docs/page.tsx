import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"

export default function ApiDocumentation() {
  return (
    <div className="container mx-auto py-10">
    <Navbar></Navbar>
      <h1 className="text-4xl font-bold my-6">CaappyWatcher Verification API Documentation</h1>
      <p className="text-lg mb-8">
        This documentation provides information about the Content Verification API endpoints. All endpoints accept POST requests only.
      </p>

      <div className="space-y-6">
        <ApiEndpoint
          title="Verify Image"
          endpoint="/api/content/verify/image"
          description="Verify the content of an uploaded image."
          requestBody="Include the image file in the request body."
          response="Details about the verification result for the image."
        />

        <ApiEndpoint
          title="Verify Video"
          endpoint="/api/content/verify/video"
          description="Verify the content of an uploaded video."
          requestBody="Include the video file in the request body."
          response="Details about the verification result for the video."
        />

        <ApiEndpoint
          title="Verify Text"
          endpoint="/api/content/verify/text"
          description="Verify the content of submitted text."
          requestBody="Include the text to be verified in the request body."
          response="Details about the verification result for the text."
        />
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Note: For detailed information about request and response formats, please contact the API administrator.
      </p>
    </div>
  )
}

interface ApiEndpointProps {
  title: string
  endpoint: string
  description: string
  requestBody: string
  response: string
}

function ApiEndpoint({ title, endpoint, description, requestBody, response }: ApiEndpointProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="destructive">POST</Badge>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {endpoint}
          </code>
        </div>
        <div className="space-y-2">
          <p><strong>Request Body:</strong> {requestBody}</p>
          <p><strong>Response:</strong> {response}</p>
        </div>
      </CardContent>
    </Card>
  )
}


import { NextResponse } from "next/server";
import { createValidationRequest, getValidationRequests, getValidationRequestById } from "@/app/actions/validationRequest";

export async function GET(request: Request, { params }: any) {
  try {
    // Check if an ID is provided in params
    if (params?.id) {
      const validationRequestById = await getValidationRequestById(params.id);

      if (!validationRequestById) {
        return NextResponse.json(
          { error: "Validation request not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(validationRequestById, { status: 200 });
    } 

  } catch (error) {
    console.error("Error fetching validation requests:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
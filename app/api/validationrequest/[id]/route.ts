import { NextResponse } from "next/server";
import { getValidationRequestById } from "@/app/actions/validationRequest";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params }: Params) {
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
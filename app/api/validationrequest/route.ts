import { createValidationRequest, getValidationRequests } from "@/app/actions/validationRequest";
import { NextResponse } from "next/server";
import { ValidationRequestStatus, ValidationRequestType } from "@prisma/client";

export async function GET(request: Request) {
	const validationRequests = await getValidationRequests();
	return NextResponse.json(validationRequests);
}


export async function POST(request: Request) {
	try {
		const body = await request.json();
		
		const validationRequest = await createValidationRequest({
			status: "PENDING" as ValidationRequestStatus,
			type: body.type as ValidationRequestType,
			content: body.content,
			createdAt: new Date(),
			updatedAt: new Date()
		});
		
		return NextResponse.json(validationRequest);
	} catch (error) {
		console.error('Error creating validation request:', error);
		return NextResponse.json(
			{ error: 'Failed to create validation request' },
			{ status: 500 }
		);
	}
}	
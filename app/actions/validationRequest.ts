"use server";

import prisma from "@/lib/db";
import { ValidationRequest, ValidationRequestStatus, ValidationRequestType } from "@prisma/client";

export async function createValidationRequest(data: {
  status: ValidationRequestStatus;
  type: ValidationRequestType;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return await prisma.validationRequest.create({
    data
  });
}

export async function getValidationRequests() {
  return await prisma.validationRequest.findMany();
}

export async function getValidationRequestById(id: number) {
  try {
    const validationRequest = await prisma.validationRequest.findUnique({
      where: { id: id }, 
    });
    return validationRequest;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export async function validateRequest(id: number) {
  try {
    await prisma.validationRequest.update({
      where: { id },
      data: { status: "VALIDATED" }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to validate request" }
  }
}

export async function rejectRequest(id: number) {
  try {
    await prisma.validationRequest.update({
      where: { id },
      data: { status: "REJECTED" }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to reject request" }
  }
}
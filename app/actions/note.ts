'use server'

import prisma from "@/lib/db";


export async function getNotes() {
  try {
    console.log('Attempting to fetch notes...');
    const notes = await prisma.note.findMany({
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('Notes fetched successfully:', notes);
    return { notes };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return { error: 'Failed to fetch notes' };
  }
}

export async function createNote(data: {
  content: string;
  type: string;
  credibilityScore: number;
  imageUrl?: string;
}) {
  try {
    const note = await prisma.note.create({
      data: {
        ...data,
        status: 'pending',
      },
    });
    return { note };
  } catch (error) {
    return { error: 'Failed to create note' };
  }
}

export async function addComment(data: {
  noteId: number;
  text: string;
  volunteerName: string;
}) {
  try {
    const comment = await prisma.noteComment.create({
      data: {
        ...data,
        date: new Date(),
      },
    });
    return { comment };
  } catch (error) {
    return { error: 'Failed to add comment' };
  }
}

export async function updateNoteStatus(id: number, status: string) {
  try {
    const note = await prisma.note.update({
      where: { id },
      data: { status },
    });
    return { note };
  } catch (error) {
    return { error: 'Failed to update note status' };
  }
} 
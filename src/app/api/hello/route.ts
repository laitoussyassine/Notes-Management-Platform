import { NextRequest, NextResponse } from 'next/server';
import Note from "@/models/NoteModel";
import "@/lib/connectDb"


export async function POST(request: NextRequest)  {
    const {title, description} = await request.json();
    const note = new Note({title, description})
    await note.save();
    return NextResponse.json({
        message: "note created"
    })
};

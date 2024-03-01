import { NextRequest, NextResponse } from 'next/server';
import Note from "@/models/NoteModel";
import "@/utils/connectDb"


export async function POST(request: NextRequest)  {
    const {title, description} = await request.json();
    const note = new Note({title, description})
    await note.save();
    return NextResponse.json({
        note,
        message: "note created"
    })
};
export async function GET() {
    try {
        const notes = await Note.find();
        if (notes.length === 0) {
            return NextResponse.json({ message: "No notes found" }, { status: 404 });
        }
        return NextResponse.json(notes );
    } catch (error) {
        return NextResponse.json({ message: "Error fetching notes" }, { status: 500 });
    }
}

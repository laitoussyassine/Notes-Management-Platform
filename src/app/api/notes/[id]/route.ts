import { NextRequest, NextResponse } from 'next/server';
import Note from "@/models/NoteModel";
import "@/utils/connectDb";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const note = await Note.findOne({ _id: id });
        
        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        
        return NextResponse.json({ note }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}
export async function PUT(request: Request, {params}: {params:{id:string}}) {
    const {id} = params;
    const {title, description} = await request.json() 
    const note = await Note.findOneAndUpdate({_id: id},{title, description});
    return NextResponse.json({
        note,
        messgae: "note updtaed",
    },
    {status: 200}
    )
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const note = await Note.findOneAndDelete({ _id: id });
        
        if (!note) {
            return NextResponse.json({ error: 'Note not found' }, { status: 404 });
        }
        
        return NextResponse.json({ note }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}
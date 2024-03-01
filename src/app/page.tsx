"use client"
import {GetNotes} from "@/lib/state/slices/notesSlice";
import { AppDispatch, RootState } from "@/lib/store";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { notes } = useSelector((state : RootState) => state.notes)

  useEffect(() => { 
    const getAllNotes = async() => {
      await dispatch(GetNotes());
    }
    getAllNotes();
  }, [])
  
  return (
    <main className="min-h-screen">
      <button className="bg-slate-600 py-1 px-2">add note</button>
      <h1>my list of notes</h1>
      <div>
        {notes?.map((note: any, index: any) => (
          <div key={index}>
            <h1><span>title:</span>{note.title}</h1>
            <h1><span>description:</span>{note.description}</h1>
          </div>
        ))}
      </div>
    </main>
  );
}

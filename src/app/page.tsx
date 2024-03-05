"use client"
import { Button } from "@/components/ui/button";
import { GetNotes } from "@/lib/state/slices/notesSlice";
import { AppDispatch, RootState } from "@/lib/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, PenLine, Trash2 } from 'lucide-react';



export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { notes } = useSelector((state : RootState) => state.notes)
  console.log(notes);
  


  useEffect(() => {
    const getAllNotes = async () => {
      await dispatch(GetNotes());
    }
    getAllNotes();
  }, [dispatch])

  

  return (
    <main className="min-h-screen mx-20 my-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-center font-bold text-xl">my list of notes</h1>
        <Link href={"/create"}>
          <Button className="w-2/12">
            <Plus size={20} />
            Add Note
          </Button>

        </Link>

        <div className="grid grid-cols-8 gap-5 justify-center items-center">
          {notes?.map((note: any, index: any) => (
            <div key={index} className="col-span-2 text-center">
              <div className={`${index % 2 == 0 ? 'bg-noteBg' : 'bg-noteBgOrange'} text-white text-lg py-2 px-3`}>
                0{index + 1}
              </div>
              <div className="bg-bodyBg  py-3 px-4 flex flex-col gap-4">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <div className="px-4">
                  <p>{note.description}</p>
                </div>
                <div className="flex items-end justify-end">
                  <Link href={`/${note._id}`}>
                    <PenLine className={`${index % 2 == 0 ? 'text-noteBg' : 'text-noteBgOrange'}  font-bold`} />
                  </Link>
                  <button>
                    <Trash2 className={`${index % 2 == 0 ? 'text-noteBg' : 'text-noteBgOrange'}  font-bold`} />
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </main>
  );
}

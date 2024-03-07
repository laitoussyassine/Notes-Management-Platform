"use client"
import InputForm from '@/components/reusable/InputForm'
import { Button } from '@/components/ui/button'
import { getOne, UpdateNote, GetNotes } from '@/lib/state/slices/notesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditNote = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const { notes } = useSelector((state: RootState) => state.notes)
  const [note, setNote] = useState({ title: "", description: "" });

  const { title, description } = note;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(UpdateNote({ id: params.id, title, description }));
    router.push('/')
  };

  useEffect(() => {

    const getNote = async (id: any) => {
      const data: any | undefined = await dispatch(getOne(id));

      setNote({
        title: data.payload?.title || "",
        description: data.payload?.description || ""
      });
      console.log("title :", data.payload?.title)
      console.log("desc :", data.payload?.description)
    };
    getNote(params);

  }, [dispatch, params]);
  return (

    <>


      <div className='flex flex-col justify-center items-center my-14'>
        <div className='w-2/4 flex flex-col justify-center gap-4 items-center bg-bodyBg rounded-lg py-5'>
          <h1 className='font-semibold text-noteBg'>Ajouter une note</h1>
          <div className='w-3/4'>
            <label htmlFor="title" className='font-semibold'>Titre:</label>
            <InputForm value={title || ""} onChange={(e) => setNote({ ...note, title: e.target.value })} name="title" />

          </div>
          <div className='w-3/4'>
            <label htmlFor="description" className='font-semibold'>Description:</label>
            <InputForm className={'h-24 py-0'} value={description || ""} onChange={(e) => setNote({ ...note, description: e.target.value })} name="description" />
          </div>
          <Button className='my-4 bg-noteBg' onClick={handleUpdate} >Update note</Button>
        </div>
      </div>
    </>
  )
}

export default EditNote;

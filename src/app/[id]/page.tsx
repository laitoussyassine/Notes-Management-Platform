"use client"
import { getOne, UpdateNote, GetNotes } from '@/lib/state/slices/notesSlice'
import { AppDispatch, RootState } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditNote = ({params} : { params : {id : string}}) => {
  const router = useRouter(); 
  const dispatch = useDispatch<AppDispatch>()
  const  {notes }  = useSelector((state : RootState) => state.notes)


  const [title, setTitle] = useState(notes.title)
  const [description, setDescription] = useState(notes.description)

  const handleUpdate =  (e: React.FormEvent) => {
    e.preventDefault(); 
    dispatch(UpdateNote({id : params.id ,title , description}));
    router.push('/')
  };

  useEffect(() => {
    
    const getNote = async (id : any) => {
      const data  : any | undefined = await dispatch(getOne(id));
    
      setTitle(data.payload?.title)
      setDescription(data.payload?.description)
      console.log("title :"  , data.payload?.title)
      console.log("desc :"  ,data.payload?.description)
    };
    getNote(params);
    
  }, [dispatch , params ]);
  return (

    <>
        <input value={title || ""} onChange={(e) => setTitle(e.target.value)} type="text" name="title" />
        <input value={description || ""} onChange={(e) => setDescription(e.target.value)} type="text" name="description" />
        <button onClick={handleUpdate}>update</button>
    </>
  )
}

export default EditNote
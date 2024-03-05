"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

import { AddNote } from "@/lib/state/slices/notesSlice"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import InputForm from '@/components/reusable/InputForm';
import { Button } from '@/components/ui/button';
const AddNotePage = () => {
  const router = useRouter()
  const { notes } = useSelector((state: RootState) => state.notes)
  const dispatch = useDispatch<AppDispatch>()
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(AddNote({ title, description }));
    router.push('/')
  };

  return (
    <div className='flex flex-col justify-center items-center my-14'>
      <h1>Ajouter une note</h1>

      <div className='w-2/4'>
        <label htmlFor="title">Titre:</label>
        <InputForm className={''} value={title}  onChange={handleTitleChange} />
       
      </div>
      <div className='w-2/4'>
        <label htmlFor="description">Description:</label>
        <InputForm className={''} value={description}  onChange={handleDescriptionChange} />
        
      </div>
      <Button className='my-4' onClick={handleSubmit} >Ajouter la note</Button>

    </div>
  );
};

export default AddNotePage;

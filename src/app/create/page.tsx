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
      <div className='w-2/4 flex flex-col justify-center gap-4 items-center bg-bodyBg rounded-lg py-5'>
      <h1 className='font-semibold text-noteBg'>Ajouter une note</h1>
        <div className='w-3/4'>
          <label htmlFor="title" className='font-semibold'>Titre:</label>
          <InputForm className={''} value={title}  onChange={handleTitleChange} />
        
        </div>
        <div className='w-3/4'>
          <label htmlFor="description" className='font-semibold'>Description:</label>
          <InputForm className={'h-24 py-0'} value={description}  onChange={handleDescriptionChange} />
        </div>
        <Button className='my-4 bg-noteBg' onClick={handleSubmit} >Ajouter la note</Button>
      </div>


    </div>
  );
};

export default AddNotePage;

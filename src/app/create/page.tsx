"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

import { AddNote } from "@/lib/state/slices/notesSlice"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
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
    <div>
      <h1>Ajouter une note</h1>

      <div>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <button onClick={handleSubmit} >Ajouter la note</button>

    </div>
  );
};

export default AddNotePage;

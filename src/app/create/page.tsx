"use client"
import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addNote } from "../../lib/state/slices/notesCreate";

function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Dispatch action to update Redux store with the new note
      dispatch(addNote(data));
      // Reset form fields
      setTitle('');
      setDescription('');
    } else {
      // Handle error
      console.error('Failed to submit note');
    }
  };

  return (
    <div className='d-flex w-100 justify-content-center align-items-center'>
      <div className='<50 border bg-secondary text-black p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title"> Title :  </label>
            <input type="text" id="title" className='form-control' placeholder='enter Title' value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description"> Description :  </label>
            <input type="text" id="description" className='form-control' placeholder='enter Description' value={description} onChange={e => setDescription(e.target.value)} />
          </div><br />
          <button type="submit" className="bg-slate-600 py-1 px-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;

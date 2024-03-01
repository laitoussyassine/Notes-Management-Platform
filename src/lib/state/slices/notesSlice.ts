import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface UserState {
    id ?: any,
    title: string;
    description: string;
}

const initialState = {
    notes : [],
} as any


export const GetNotes = createAsyncThunk('notes/GetNotes', async () => {
    try {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        const message = error.message || "An error occurred while fetching notes";
        throw new Error(message);
    }
});


const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetNotes.fulfilled,(state,action)=>{
            state.notes = action.payload
            console.log(action.payload)
        })
    }
})

export default notesSlice.reducer
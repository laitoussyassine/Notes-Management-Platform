import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
 interface notes {
    id ?: any,
    title: string,
    description: string,
}

const initialState = {
    notes: [],

} as any;

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

export const AddNote = createAsyncThunk('notes/AddNote', async (newNote: { title: string; description: string }) => {
    try {
        const response = await fetch("http://localhost:3000/api/notes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        const message = error.message || "An error occurred while adding a note";
        throw new Error(message);
    }
});
// export const AddNote = createAsyncThunk<{notes : notes}, notes , { rejectValue: string }>('notes/postNote', async (notes ,{ rejectWithValue}) => {
//     try {
//         const res = await axios.post("http://localhost:3000/api/notes",notes)
//         return res.data
//     } 
//         catch (error : any) {
//             return rejectWithValue(error)
//             console.log(error)
//         }})
const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
              
                console.log(action.payload);
            })
            .addCase(AddNote.fulfilled, (state, action) => {
                state.notes.push(action.payload);
              
                console.log("Note added:", action.payload);
            });
    }
});

export default notesSlice.reducer;

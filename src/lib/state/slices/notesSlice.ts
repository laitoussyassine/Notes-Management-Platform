import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 interface notes {
    id ?: any,
    title: string,
    description: string,
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

export const getOne = createAsyncThunk('notes/getOne', async (noteId: {id :any}) => {
    try {
        const response = await fetch(`http://localhost:3000/api/notes/${noteId.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json(); 
        return data;
    } catch (error: any) {
        const message = error.message;
        throw new Error(message);
    }
})

export const UpdateNote = createAsyncThunk('notes/UpdateNote', async (note: { id:any ,title: string; description: string }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/notes/${note.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });
        const data = await response.json();
        return data
    } catch (error: any) {
        const message = error.message || "An error occurred while Updating a note";
        throw new Error(message);
    }
})

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
            })
            .addCase(getOne.fulfilled, (state, action) => {
                state.notes = action.payload
                console.log(action.payload);
                
            })
            .addCase(UpdateNote.fulfilled, (state, action) => {
                state.notes = action.payload
            });
    }
});

export default notesSlice.reducer;

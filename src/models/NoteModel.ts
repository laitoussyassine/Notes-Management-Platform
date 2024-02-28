import mongoose, { Schema} from "mongoose";
const noteSchema = new Schema(
    {
        title: {
                
            type: String,
            required : true
        },
        description: {
            type: String,
            required : true
        },
    }, {
        timestamps:true
    }
);

const Note = mongoose.models.Note ||  mongoose.model('Note', noteSchema)
export default Note 
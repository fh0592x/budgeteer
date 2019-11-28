import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Category', CategorySchema);
import mongoose from 'mongoose';
import moment from 'moment';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: moment().toISOString(),
        required: true
    },
    updatedAt: {
        type: Date,
        default: moment().toISOString(),
        required: true
    }
});

const item = mongoose.model('item', itemSchema);

export default item;

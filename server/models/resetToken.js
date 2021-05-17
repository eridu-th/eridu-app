const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    purpose: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    used: {
        type: Boolean,
        default: false,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
}, {
    timestamps: true,
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);

module.exports = ResetToken;
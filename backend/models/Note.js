const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    content: {

        type: String,

        required: true

    },

    categoryId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Category"

    },

    isPinned: {
    type: Boolean,
    default: false,
},

isArchived: {
    type: Boolean,
    default: false,
},

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Note", noteSchema);
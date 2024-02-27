import mongoose, {Schema}  from "mongoose";

const jobschema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true

    },
    salaryFrom: {
        type: String,
        minLength: [4, "the salary must contain atleast 4 degits"],
        maxlength: [9, "the max salsry cannot excced the 9 digits"]


    },
    salaryTo: {
        type: Number,
        minLength: [4, "the salary must contain atleast 4 degits"],
        maxlength: [9, "the max salsry cannot excced the 9 digits"]
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Job = mongoose.model("Job", jobschema)
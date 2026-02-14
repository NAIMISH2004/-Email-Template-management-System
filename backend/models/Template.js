import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    currentVersion: {
        subject: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    versions: [versionSchema]
});

const Template = mongoose.model("Template", templateSchema);

export default Template;
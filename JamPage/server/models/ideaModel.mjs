import mongoose from 'mongoose';

let Idea = undefined;

function createModel () {
    if (!Idea) {
        const ideaSchema = mongoose.Schema({
            band: {type: String, required: true},
            title: {type: String, required: true},
            date: {type: Date, required: true},
            original_recording: {type: Buffer, required: true},
            additional_ideas: [{
                additional_recordings: {type: Buffer, required: false},
                notes: {type: String, required: false}
            }]
        });
        Idea = mongoose.model('idea', ideaSchema);
    }
    return Idea
}

function getIdeas (filter = {}) {
    return Idea.find(filter).exec();
}

createModel();

async function createIdea (band, date, title, original_recording) {
    const idea = new Idea({band: band, date: date, title: title, original_recording: original_recording});
    return idea.save();
}

export { createModel, createIdea, getIdeas }
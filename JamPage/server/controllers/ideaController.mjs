import express from 'express';
import asyncHandler from 'express-async-handler';

import * as ideas from '../models/ideaModel.mjs';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { band, date, title, original_recording } = req.body;
    const newIdea = await ideas.createIdea(band, date, title, original_recording);
    res.status(201).json(newIdea);
}));

router.get('/', asyncHandler(async (req, res) => {
    const filter = req.query;
    let matchingIdeas;

    if (filter.length === 0) {
        matchingIdeas = await ideas.getIdeas();
    } else {
        matchingIdeas = await ideas.getIdeas(filter);
    }

    res.status(200).json(matchingIdeas);
}));

export default router;
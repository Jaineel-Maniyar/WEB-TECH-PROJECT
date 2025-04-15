import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors()); // Allow Cross-Origin Requests

const API_KEY = 'AIzaSyB6y8RcJqKyvLMRH2oRlenDGag3eqgqfyY';

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/api/trailer', async (req, res) => {
    try {
        const movieName = req.query.movie;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieName}+trailer&type=video&key=${API_KEY}`);
        const videoId = response.data.items[0]?.id?.videoId;
        res.json({ trailerUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : null });
        console.log("Api fetched successfully");
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trailer' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

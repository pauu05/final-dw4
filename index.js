const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

DB = process.env.DB;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const serieSchema = new mongoose.Schema ({
    title: String,
    genre: String,
    releaseYear: Number
});

const Serie = mongoose.model('Serie', serieSchema);

app.post('/series' , async (req, res) => {
    try {
        const newSerie = await Serie.create(req.body);
        res.json(newSerie);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la serie.' });
    }
});

app.get('/series' , async (req, res) => {
    try {
        const series = await Serie.find();
        res.json(series);
    } catch (error) {
        res.status(404).json({ error: 'Error al obtener las series.'});
    }
});

app.put('/series/:id', async (req, res) => {
    try {
        const updateSerie = await Serie.findByIdAndUpdate(req.params.id,
        req.body, { new: true });
        res.json(updateSerie);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la serie.' });
    }
});

app.delete('/series/:id', async (req, res) => {
    try {
        const deletedSerie = await Serie.findByIdAndDelete(req.params.id);
        res.json(deletedSerie);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la serie.'});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
});
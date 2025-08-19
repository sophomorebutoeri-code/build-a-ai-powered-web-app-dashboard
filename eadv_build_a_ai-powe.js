// Imports
import express from 'express';
import { NLPManager } from 'node-nlp';
import { v4 as uuidv4 } from 'uuid';

// Initialize Express App
const app = express();

// Initialize NLP Manager
const nlpManager = new NLPManager();
nlpManager.addLanguage('en');

// Dashboard Data
const dashboardData = {
  charts: [
    {
      id: uuidv4(),
      type: 'line',
      data: [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 20 },
        { x: 'Mar', y: 30 },
      ],
    },
    {
      id: uuidv4(),
      type: 'bar',
      data: [
        { x: 'A', y: 40 },
        { x: 'B', y: 50 },
        { x: 'C', y: 60 },
      ],
    },
  ],
  tables: [
    {
      id: uuidv4(),
      columns: ['Name', 'Age', 'Country'],
      data: [
        ['John Doe', 30, 'USA'],
        ['Jane Doe', 25, 'UK'],
        ['Bob Smith', 40, 'Canada'],
      ],
    },
  ],
};

// API Endpoints
app.get('/api/charts', (req, res) => {
  res.json(dashboardData.charts);
});

app.get('/api/tables', (req, res) => {
  res.json(dashboardData.tables);
});

app.post('/api/analyze-text', (req, res) => {
  const { text } = req.body;
  nlpManager.process('en', text).then((result) => {
    res.json(result);
  });
});

// Frontend Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
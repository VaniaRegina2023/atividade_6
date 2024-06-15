import express from 'express';
import path from 'path';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', taskRoutes);

// Servir a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

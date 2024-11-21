import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
// Enable __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files (frontend) if in production
app.use(express.static(path.resolve(__dirname, '../../client/dist')));
// Middleware to parse JSON
app.use(express.json());
// Use API routes
app.use(routes);
// Serve frontend for any unknown route (React Router support)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
    });
}
// Sync database and start server
const forceDatabaseRefresh = process.env.NODE_ENV !== 'production';
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

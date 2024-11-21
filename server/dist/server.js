const forceDatabaseRefresh = false;
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path'; // Import path module for deployment
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files (frontend) if in production
app.use(express.static('../client/dist'));
// Middleware to parse JSON
app.use(express.json());
// Use API routes
app.use(routes);
// Serve frontend for any unknown route (React Router support)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (_, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
    });
}
// Sync database and start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});

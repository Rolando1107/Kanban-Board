import { sequelize } from '../models/index.js';

(async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Seeding should not be run in production.');
    process.exit(1);
  }

  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully!');
    // Add your seed logic here
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
})();

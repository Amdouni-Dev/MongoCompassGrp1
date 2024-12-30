require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const { connectToDatabase, client } = require('./config/database');
const userRoutes = require('./Routes/userRoutes');
const app = express();

const PORT = process.env.PORT || 3000;
// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use('/api',userRoutes)


// Endpoint pour tester la connexion à MongoDB
app.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    res.send("MongoDB connection successful!");
  } catch (error) {
    res.status(500).send("Failed to connect to MongoDB");
  }
});
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Fermer la connexion MongoDB à la fermeture du serveur
process.on('SIGINT', async () => {
  console.log("Closing MongoDB connection...");
  await client.close();
  process.exit(0);
});

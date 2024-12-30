require('dotenv').config();// npm i dotenv
const { MongoClient } = require('mongodb');
//const mongodb=require("mongodb")
//const Mongoclient=mongodb.Mongoclient
// Récupérer l'URI depuis le fichier .env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Fonction pour connecter à la base de données
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db('users'); // Retourne une instance de la base de données
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Arrêter l'application si la connexion échoue
  }
}



module.exports = { connectToDatabase, client };

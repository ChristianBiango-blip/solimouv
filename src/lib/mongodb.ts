import { MongoClient, Db } from "mongodb";
import { env, validateEnv } from "@/config/env";

// Validation des variables d'environnement au chargement
validateEnv();

// Type global pour le singleton en développement (hot-reload)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (env.NODE_ENV === "development") {
  // En développement, on utilise une variable globale pour que la connexion
  // survive au hot-reloading et évite de créer plusieurs clients.
  if (!global._mongoClientPromise) {
    const client = new MongoClient(env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, on crée un nouveau client.
  const client = new MongoClient(env.MONGODB_URI);
  clientPromise = client.connect();
}

/**
 * Retourne une Promise qui résout le MongoClient connecté.
 * À utiliser dans le code côté serveur (Server Components, Route Handlers, Server Actions).
 *
 * @example
 * const client = await connectToDatabase();
 * const db = client.db("solimouv");
 * const collection = db.collection("workshops");
 */
export async function connectToDatabase(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Retourne une Promise qui résout l'instance de la base de données.
 *
 * @example
 * const db = await getDb();
 * const workshops = await db.collection("workshops").find({}).toArray();
 */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(env.MONGODB_DB);
}

export default clientPromise;

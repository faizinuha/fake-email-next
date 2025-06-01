import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Mohon tambahkan MONGODB_URI di file .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = 'fakeinbox';

interface MongoConnection {
  client: MongoClient | null;
  db: Db | null;
}

let cachedConnection: MongoConnection = {
  client: null,
  db: null,
};

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedConnection.client && cachedConnection.db) {
    return {
      client: cachedConnection.client,
      db: cachedConnection.db,
    };
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db(dbName);

    // Validasi koneksi dengan ping
    await db.command({ ping: 1 });
    console.log('🚀 Berhasil terhubung ke MongoDB!');

    // Cache koneksi
    cachedConnection = {
      client,
      db,
    };

    return { client, db };
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error);
    throw new Error('Tidak dapat terhubung ke database');
  }
}

// Fungsi untuk menutup koneksi
export async function closeConnection(): Promise<void> {
  try {
    if (cachedConnection.client) {
      await cachedConnection.client.close();
      cachedConnection = {
        client: null,
        db: null,
      };
      console.log('📡 Koneksi MongoDB ditutup');
    }
  } catch (error) {
    console.error('❌ Gagal menutup koneksi MongoDB:', error);
    throw error;
  }
}

// Handler untuk graceful shutdown
const handleShutdown = async () => {
  try {
    await closeConnection();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error saat shutdown:', error);
    process.exit(1);
  }
};

// Event listeners untuk graceful shutdown
process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

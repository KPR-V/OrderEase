import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) {
      console.log('Already connected to database');
      return;
    }

    const { connection } = await mongoose.connect(process.env.MONGODB_URI, { dbName: "OrderEase" });
    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    throw new Error('Could not connect to database');
  }
};

import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('Already connected to database');
      return;
    }

    mongoose.set('strictQuery', false);

    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "OrderEase"
    });
    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    throw new Error('Could not connect to database');
  }
};

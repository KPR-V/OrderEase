import mongoose from 'mongoose';
export const connectdb = async () => {
    try {
        if (mongoose.connections && mongoose.connections[0].readyState) return
        const { connection } = await mongoose.connect(
            process.env.MONGODB_URI, { dbName: "OrderEase" })
        console.log(`connected to database ${connection.host}`);;
    }
    catch (error) {
        throw new Error('could not connect to database')

    }
} 
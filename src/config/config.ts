import dotenv from 'dotenv';

dotenv.config();
const mongoDB = "mongodb+srv://onkar:onkar@cluster0.toikh.mongodb.net/backend_assign?retryWrites=true&w=majority"

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5001;

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: mongoDB
    },
    server: {
        port: SERVER_PORT
    }
};
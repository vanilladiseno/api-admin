import { config } from 'dotenv';

config();

export default {
    host: process.env.PGHOST || "",
    database : process.env.PGDATABASE || "",
    user : process.env.PGUSER || "",
    password : process.env.PGPASSWORD || "",
    port_bd : process.env.PGPORT
}
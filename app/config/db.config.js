module.exports = {
    HOST: process.env.PGHOST || "localhost",
    USER: process.env.PGUSER || "postgres",
    PASSWORD: process.env.PGPASSWORD || "123",
    DB: process.env.PGDATABASE || "students",
    dialect: "postgres",
    pool: {
        max: 100,
        min: 10,
        acquire: 30000,
        idle: 10000
    }
};

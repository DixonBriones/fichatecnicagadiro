if (process.env.NODE_ENV !== "production")
{
    require("dotenv").config()
}

module.exports= {
    PORT: process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_DATABASE:process.env.DB_DATABASE,
    DB_PORT:process.env.DB_PORT,
    JWT_SECRET:process.env.JWT_SECRET,
    HOST:process.env.HOST,
    DIR_STORAGE:process.env.DIR_STORAGE
}
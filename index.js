require('dotenv').config()
const app = require('./src/app')
const { sequelize } = require('./src/models')

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await sequelize.authenticate()
        console.log('✅ Database connected successfully')
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.error('❌ Unable to connect to database:', err.message)
        process.exit(1)
    }
}

start()
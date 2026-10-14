require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userModel = require("../src/models/user.model")

const DEMO_USER = {
    username: process.env.DEMO_USERNAME || "demo",
    email: process.env.DEMO_EMAIL || "demo@jobfit.ai",
    password: process.env.DEMO_PASSWORD || "demo1234"
}

async function seedDemoUser() {
    await mongoose.connect(process.env.MONGO_URI)

    const hash = await bcrypt.hash(DEMO_USER.password, 10)

    await userModel.findOneAndUpdate(
        { email: DEMO_USER.email },
        { username: DEMO_USER.username, email: DEMO_USER.email, password: hash },
        { upsert: true }
    )

    console.log(`Demo user ready: ${DEMO_USER.email} / ${DEMO_USER.password}`)

    await mongoose.disconnect()
}

seedDemoUser().catch((err) => {
    console.log(err)
    process.exit(1)
})

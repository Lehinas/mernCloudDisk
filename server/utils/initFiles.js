const fs = require("fs")
const path = require("path")
const config = require("config")
const initFiles = (subDirs) => {
    const storagePath = path.join(config.get("serverPath"), "storage")
    
    if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath)
        console.log("Папка storage создана")
    }
    
    subDirs.forEach((dir) => {
        const dirPath = path.join(storagePath, dir)
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath)
            console.log(`Поддиректория "${dir}" создана`)
        }
    })
}

module.exports = {
    initFiles
}
const config = require("config")

const createPath = (user, parent, file, relativePath) => {
    let path
    if (relativePath) {
        if (parent) {
            path = `${config.get("filesDirPath")}\\${user.id}\\${parent.path}\\${relativePath}\\${file.name}`
        } else {
            path = `${config.get("filesDirPath")}\\${user.id}\\${relativePath}\\${file.name}`
        }
    } else {
        if (parent) {
            path = `${config.get("filesDirPath")}\\${user.id}\\${parent.path}\\${file.name}`
        } else {
            path = `${config.get("filesDirPath")}\\${user.id}\\${file.name}`
        }
    }
    return path
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}

module.exports = {
    createPath,
}
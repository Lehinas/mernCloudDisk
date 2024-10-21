const config = require("config")
const fs = require("fs")
const { FileError } = require("../exceptions/fileError")
const createFile = async (file) => {
    const filePath = `${config.get("filesDirPath")}\\${file.user}\\${file.path}`
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return resolve({ message: "Файл был создан" })
            } else {
                return reject(FileError.FileAlreadyExistsError())
            }
        } catch (e) {
            return reject(FileError.FileCreationError('Ошибка при создании папки'))
        }
    })
}

module.exports = {
    createFile
}
const fs = require("fs")
const config = require("config")
const { fileModel } = require("../entities/fileModel")
const { createFile } = require("../utils/createFile")
const { userModel } = require("../entities/userModel")
const { FileError } = require("../exceptions/fileError")
const { deleteLocalFile, deleteLocalFolder } = require("../utils/deleteContent")

class FileService {
    async createDir (user, name, type, parent) {
        const file = await new fileModel({ name, type, parent, user: user.id })
        const parentFile = await fileModel.findOne({ _id: parent })
        if (!parentFile) {
            file.path = name
            await createFile(file)
        } else {
            file.path = `${parentFile.path}\\${file.name}`
            await createFile(file)
            parentFile.childs.push(file._id)
            await parentFile.save()
        }
        await file.save()
        return file
    }
    
    async getFiles (sort, order, user, parent) {
        let files
        let sortOrder = order === "inc" ? 1 : -1
        switch (sort) {
            case "name":
                files = await fileModel.find({ user, parent }).sort({ name: sortOrder })
                break
            case "date":
                files = await fileModel.find({ user, parent }).sort({ date: sortOrder })
                break
            case "size":
                files = await fileModel.find({ user, parent }).sort({ size: sortOrder })
                break
            default:
                files = await fileModel.find({ user, parent })
        }
        return files
    }
    
    async uploadFile (file, user, parentId) {
        const parent = await fileModel.findOne({ user: user.id, _id: parentId })
        const userDB = await userModel.findOne({ _id: user.id })
        
        if (userDB.usedSpace + file.size > user.diskSpace) {
            throw new FileError.InsufficientDiskSpaceError()
        }
        let path
        if (parentId) {
            path = `${config.get("filesDirPath")}\\${user.id}\\${parent.path}\\${file.name}`
        } else {
            path = `${config.get("filesDirPath")}\\${user.id}\\${file.name}`
        }
        if (fs.existsSync(path)) {
            throw new FileError.FileAlreadyExistsError()
        }
        await file.mv(path)
        userDB.usedSpace = user.usedSpace + file.size
        
        const type = file.name.split(".").pop()
        let filePath = file.name
        if (parentId) {
            filePath = `${parent.path}\\${file.name}`
        }
        const dbFile = new fileModel({
            name: file.name,
            type,
            size: file.size,
            path: filePath,
            parent: parent?._id,
            user: user.id,
        })
        await dbFile.save()
        await userDB.save()
        
        return dbFile
    }
    
    async downloadFile (userId, fileId) {
        if (!userId || !fileId) {
            throw new FileError.InvalidFileRequest("Отсутствуют id user или file")
        }
        const file = await fileModel.findOne({ user: userId, _id: fileId })
        const path = `${config.get("filesDirPath")}\\${userId}\\${file.path}`
        if (fs.existsSync(path)) {
            return path
        }
        throw new FileError.FileNotFoundError()
    }
    
    async deleteFiles (userId, fileId) {
        const user = await userModel.findOne({ _id: userId })
        const file = await fileModel.findOne({ user: userId, _id: fileId })
        const filePath = `${config.get("filesDirPath")}\\${userId}\\${file.path}`
        console.log(filePath)
        if (!file) {
            throw new FileError.FileNotFoundError()
        }
        if (file.type === "dir") {
            const childFiles = await fileModel.find({ parent: file._id })
            for (const childFile of childFiles) {
                await this.deleteFiles(userId, childFile._id)
            }
            // произошла пробежка по всем приколам
            await deleteLocalFolder(filePath)
            
        } else {
            await deleteLocalFile(filePath)
        }
        await fileModel.findByIdAndDelete(file._id)
        user.size = user.size + file.size
        user.save()
        return "lol"
    }
    
    async searchFiles(searchName, userId) {
        let files = await fileModel.find({user: userId})
        files = files.filter(file => file.name.includes(searchName))
        return files
    }
}

const fileService = new FileService()
module.exports = {
    fileService,
}
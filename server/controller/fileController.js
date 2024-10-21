const { fileModel } = require("../entities/fileModel")
const { fileService } = require("../service/fileService")

class FileController {
    async createDir (req, res, next) {
        try {
            const { name, type, parent } = req.body
            const user = req.user
            const file = await fileService.createDir(user, name, type, parent)
            res.json(file)
        } catch (e) {
            next(e)
        }
    }
    
    async getFiles (req, res, next) {
        try {
            const { sortName, sortType, parent } = req.query
            const user = req.user.id
            const files = await fileService.getFiles(sortName, sortType, user, parent)
            return res.json(files)
        } catch (e) {
            next(e)
        }
    }
    
    async uploadFile (req, res, next) {
        try {
            const { files, user, body } = req
            const dbFile = await fileService.uploadFile(files.file, user, body.parentId)
            res.json(dbFile)
        } catch (e) {
            next(e)
        }
    }
    
    async downloadFile (req, res, next) {
        try {
            const { userId, fileId } = req.query
            const path = await fileService.downloadFile(userId, fileId)
            res.download(path)
        } catch (e) {
            next(e)
        }
    }
    
    async deleteFiles (req, res, next) {
        try {
            const { fileId, userId } = req.query
            const response = await fileService.deleteFiles(userId, fileId)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }
    
    async searchFiles (req, res, next) {
        try {
            const { searchName, userId } = req.query
            const files = await fileService.searchFiles(searchName, userId)
            res.json(files)
        } catch (e) {
            next(e)
        }
    }
}

const fileController = new FileController()
module.exports = {
    fileController,
}
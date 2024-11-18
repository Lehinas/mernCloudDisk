const { userModel } = require("../entities/userModel")
const mailService = require("../service/mailService")
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const { tokenService } = require("./tokenService")
const { UserDTO } = require("../dto/userDTO")
const { AuthError } = require("../exceptions/authError")
const { fileModel } = require("../entities/fileModel")
const { createFolder } = require("../utils/createFolder")
const { tokenModel } = require("../entities/tokenModel")

class UserService {
    async registration (username, email, password) {
        const candidate = await userModel.findOne({ email })
        if (candidate) {
            throw AuthError.BadRequest(`Пользователь с таким ${email} уже существует`)
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const activationId = uuid.v4()
        const activationLink = "http://localhost:5000/api/auth/activate/" + activationId
        const user = await new userModel({ username, email, password: hashPassword, activationLink: activationId })
        await mailService.sendActivationMail(email, activationLink)
        await user.save()
        await createFolder(new fileModel({ user: user._id, name: ""}))
        const userDTO = new UserDTO(user)
        const tokens = await tokenService.generateTokens({ ...userDTO })
        await tokenService.saveToken(userDTO.id, tokens.refreshToken, 24 * 30)
        return {
            tokens,
            user: userDTO,
        }
    }
    
    async login (email, password) {
        const user = await userModel.findOne({ email })
        if (!user) {
            throw AuthError.BadRequest("Пользователь не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw AuthError.BadRequest("Неверный пароль")
        }
        const userDTO = new UserDTO(user)
        const tokens = await tokenService.generateTokens({ ...userDTO })
        await tokenService.saveToken(userDTO.id, tokens.refreshToken, 30 * 24)
        return {
            tokens,
            user: userDTO,
        }
    }
    
    async activate (activationLink) {
        const user = await userModel.findOne({ activationLink })
        if (!user) {
            throw AuthError.BadRequest("Некорректная ссылка активации")
        }
        user.isActivated = true
        user.save()
    }
    
    async refresh (refreshToken) {
        if (!refreshToken) {
            throw AuthError.BadRequest("Пользователь не авторизован")
        }
        const userData = tokenService.validateRefreshToken(refreshToken) // мой токен
        const tokenInDB = await tokenService.findToken(refreshToken)   // проверил что он ест в дб
        if (!userData || !tokenInDB) {
            throw AuthError.BadRequest("Пользователь не авторизован / Токен не действителен")
        }
        const user = await userModel.findById(tokenInDB.user) // какой я долбаеб, надеюсь вспомню в будущем что не написал await, из-за чего проебал 2часа
        const userDTO = new UserDTO(user)
        
        const tokens = await tokenService.generateTokens({ ...userDTO })
        await tokenService.saveToken(userDTO.id, tokens.refreshToken, 24 * 30)
        return {
            tokens,
            user: userDTO,
        }
    }
    
    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
}

const userService = new UserService()
module.exports = {
    userService,
}
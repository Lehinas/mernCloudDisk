const jwt = require("jsonwebtoken")
const config = require("config")
const {tokenModel} = require("../entities/tokenModel");
class TokenService {
    async generateTokens(payload){
        const accessToken = jwt.sign(payload, config.get("secretKeyAccess"), {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, config.get("secretKeyRefresh"), {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken, ttlHours){
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + ttlHours)

        const tokenData = await tokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            tokenData.expiresAt = expiresAt
            return tokenData.save()
        }
        const token = new tokenModel({
            user: userId,
            refreshToken,
            expiresAt
        });
        await token.save()
        return token
    }

    async removeToken(token){
        const tokenData = await tokenModel.deleteOne({refreshToken: token})
        return tokenData
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, config.get("secretKeyRefresh"))
            return userData
        } catch (e) {
            return null
        }
    }
    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, config.get("secretKeyAccess"))
            return userData
        } catch (e) {
            return null
        }
    }
    async findToken(token){
        const tokenData = await tokenModel.findOne({refreshToken: token})
        return tokenData
    }
}

const tokenService = new TokenService()

module.exports = {
    tokenService
}

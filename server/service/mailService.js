const nodemailer = require("nodemailer")
const config = require("config")
class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.get("SMTP_HOST"),
            port: config.get("SMTP_PORT"),
            secure: true,
            auth: {
                user: config.get("SMTP_USER"),
                pass: config.get("SMTP_PASSWORD")
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: config.get("SMTP_USER"),
            to: to,
            subject: "Активация аккаунта на lehinasMERN",
            text: "",
            html:
                `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()
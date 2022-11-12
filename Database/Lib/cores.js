const chalk = require("chalk")

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const mylog = (text, color) => {
return !color ? chalk.whiteBright("[ WHATSAPP BOT ] ") + chalk.greenBright(text) : chalk.greenBright("[ WHATSAPP BOT ] ") + chalk.keyword(color)(text)
}

module.exports = {
color,
mylog
}

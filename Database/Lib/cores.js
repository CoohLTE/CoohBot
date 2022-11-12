const chalk = require("chalk")

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const mylog = (text, color) => {
return !color ? chalk.whiteBright("[ A04Corp BOT ] ") + chalk.greenBright(text) : chalk.greenBright("[ A04Corp BOT ] ") + chalk.keyword(color)(text)
}

module.exports = {
color,
mylog
}

const cfonts = require("cfonts")
const chalk = require("chalk")
const axios = require("axios")
const fetch = require("node-fetch")
const mimetype = require("mime-types")
const FormData = require("form-data")
const { fromBuffer } = require("file-type")

var cores = ["greenBright", "whiteBright"]
const cor1 = cores[Math.floor(Math.random() * (cores.length))]
const cor2 = cores[Math.floor(Math.random() * (cores.length))]

const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}

const banner = cfonts.render(("CoohBot"), {
font: "block",
align: "center",
colors: [`${cor1}`,`${cor2}`],
})

const getExtension = async (type) => {
	return await mimetype.extension(type)
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
}

function upload (midia)  {
return new Promise(async (resolve, reject) => {
try {
let { ext } = await fromBuffer(midia)
let form = new FormData()
form.append("file", midia, "tmp." + ext)
await fetch("https://telegra.ph/upload", {
method: "POST",
body: form
})
.then(html => html.json())
.then(post => {
resolve("https://telegra.ph" + post[0].src)
})
.catch(erro => reject(erro))
} catch (erro) {
return console.log(erro)
}
})
}

module.exports = { banner, getGroupAdmins, getBuffer, getExtension, getRandom, upload }

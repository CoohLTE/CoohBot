require('dotenv').config()
const {
default: makeWASocket,
makeInMemoryStore,
useSingleFileAuthState,
BufferJSON, 
DisconnectReason, 
fetchLatestBaileysVersion,
downloadContentFromMessage,
delay
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const P = require("pino") 
const clui = require("clui")
const { Spinner } = clui
const fetch = require("node-fetch")
const { color, mylog } = require("./Database/Lib/cores")
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
const speed = require("performance-now")
const { banner, getGroupAdmins, getBuffer, getRandom, getExtension, upload } = require("./Database/Lib/funções")
const { fetchJson } = require("./Database/Lib/fetcher")
const registros = JSON.parse(fs.readFileSync("./Database/Json/registros.json"))
const { menu } = require("./Database/Menus/menu.js")

logo = process.env.logo
prefixo = process.env.prefixo
nomeBot = process.env.nomeBot
numeroBot = process.env.numeroBot
nomeDono = process.env.nomeDono
numeroDono = process.env.numeroDono

// Função do ping
let girastamp = speed()
let latensi = speed() - girastamp

// Início da conexão
async function startCooh() {
const store = makeInMemoryStore({ logger: P().child({ level: "debug", stream: "store" }) })

//Conexão com o qr
const loadState = () => {
var state
try {
const value = JSON.parse(fs.readFileSync("./qr-code.json", { encoding: "utf-8" }), BufferJSON.reviver)
state = { 
creds: value.creds, 
keys: initInMemoryKeyStore(value.keys) 
}
} catch {}
return state
}

const { state, saveState } = useSingleFileAuthState("./qr-code.json")
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(banner.string)
console.log(mylog("CONECTADO COM SUCESSO!!"))
const cooh = makeWASocket({
version,  
logger: P({ level: "silent"}),
printQRInTerminal: true,
auth: state
})
store.bind(cooh.ev)

cooh.ev.on("chats.set", () => {
//pode usar "store.chats" como quiser, mesmo depois que o soquete morre
// "chats" => uma instância keyedDB
console.log("Tem conversas", store.chats.all())
})
cooh.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})
cooh.ev.on("creds.update", saveState)


// Chat update
// Ouvir quando as credenciais auth é atualizada
cooh.ev.on("messages.upsert", async ({ messages }) => {
try {
const info = messages[0]
if (!info.message) return 
await cooh.readMessages(info.key.remoteJid, [info.key.id], info.key.participant)
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
global.prefixo

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

// Body
var body = (type === "conversation") ?
info.message.conversation : (type == "imageMessage") ?
info.message.imageMessage.caption : (type == "videoMessage") ?
info.message.videoMessage.caption : (type == "extendedTextMessage") ?
info.message.extendedTextMessage.text : (type == "buttonsResponseMessage") ?
info.message.buttonsResponseMessage.selectedButtonId : (type == "listResponseMessage") ?
info.message.listResponseMessage.singleSelectenviar.selectedRowId : (type == "templateButtonenviarMessage") ?
info.message.templateButtonenviarMessage.selectedId : ""
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

// Bady
bady = (type === "conversation") ? info.message.conversation : (type == "imageMessage") ? info.message.imageMessage.caption : (type == "videoMessage") ? info.message.videoMessage.caption : (type == "extendedTextMessage") ? info.message.extendedTextMessage.text : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectenviar.selectedRowId) ? info.message.listResponseMessage.singleSelectenviar.selectedRowId: ""

// Budy
budy = (type === "conversation") ? info.message.conversation : (type === "extendedTextMessage") ? info.message.extendedTextMessage.text : ""

//===

button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

bidy =  budy.toLowerCase()

// Enviar gifs
const enviargif = (videoDir, caption) => {
cooh.sendMessage(from, {
video: fs.readFileSync(videoDir),
caption: caption,
gifPlayback: true
})
}

// Enviar imagens
const enviarimg = (imageDir, caption) => {
cooh.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
})
}

// Enviar figs
const enviarfig = async (figu, tag) => {
bla = fs.readFileSync(figu)
cooh.sendMessage(from, {sticker: bla}, {quoted: info})
}

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? cooh.sendMessage(from, {text: teks.trim(), mentions: memberr}) : cooh.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const arg = body.substring(body.indexOf(" ") + 1)
const numeroBot = cooh.user.id.split(":")[0]+"@s.whatsapp.net"
const argss = body.split(/ +/g)
const testat = body
const ants = body
const isGroup = info.key.remoteJid.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const q = args.join(" ")
const sender = isGroup ? info.key.participant : info.key.remoteJid
const pushname = info.pushName ? info.pushName : ""
const groupMetadata = isGroup ? await cooh.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""

resposta = {
espere: "[⚙️] Aguarde...enviando [❗]",
grupo: "[⚙️] Esse comando só pode ser usado em grupo [❗]",
privado: "[⚙️] Esse comando só pode ser usado no privado [❗]",
adm: "[⚙️] Esse comando só pode ser usado por administradores de grupo [❗]",
botadm: " [⚙️] Este comando só pode ser usado quando o bot se torna administrador [❗]",
registro: `[⚙️️] Você não se registrou utilize ${prefixo}rg para se registrar [❗]`,
norg: "[⚙️️] Você ja está registrado [❗]",
erro: "[⚙️] Error, tente novamente mais tarde [❗]"
}

const verificado = {"key": {"fromMe": false,"participant":"0@s.whatsapp.net", "remoteJid": "552796100962@g.us" }, "message": {orderMessage: {itemCount: 0,status: 4, thumbnail: fs.readFileSync(`./Database/Fotos/verificado.png`) ,message: `Nick : ${pushname}`,surface: 100, sellerJid: "0@s.whatsapp.net"}}}

// Consts dono/adm etc...
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const argis = bidy.trim().split(/ +/)
const isOwner = sender.includes(numeroDono)
const enviar = (texto) => {
cooh.sendMessage(from, { text: texto }, {quoted: info})
} 
const isRegistro = registros.includes(sender)

// Envia imagem com botão
const enviarImgB = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
cooh.sendMessage(id, buttonMessage, {quoted: vr})
}

// Consts isQuoted
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage")
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

// Comando no pv
if (!isGroup && isCmd && sender) console.log(`\x1b[1;37m \n\x1b[1;37m  Número: ${color(sender.split("@")[0])}\n\x1b[1;37m  Data: ${color(hora)}\n\x1b[1;37m  Comando: ${color(comando)}\n\x1b[1;37m  Palavras: ${color(args.length)}\n\x1b[1;37m`)

// Mensagem no pv
if (!isGroup && !isCmd && sender) console.log(`\x1b[1;37m \n\x1b[1;37m  Número: ${color(sender.split("@")[0])}\n\x1b[1;37m  Data: ${color(hora)}\n\x1b[1;37m  Comando: Não\n\x1b[1;37m  Palavras: ${color(argis.length)}\n\x1b[1;37m`)

// Comando em grupo
if (isCmd && isGroup && sender) console.log(`\x1b[1;37m \n\x1b[1;37m  Número: ${color(sender.split("@")[0])}\n\x1b[1;37m  Data: ${color(hora)}\n\x1b[1;37m  Comando: ${color(comando)}\n\x1b[1;37m  Palavras: ${color(args.length)}\n\x1b[1;37m  Grupo: ${color(groupName)}\n\x1b[1;37m`)

// Mensagem em grupo
if (!isCmd && isGroup && sender) console.log(`\x1b[1;37m \n\x1b[1;37m  Número: ${color(sender.split("@")[0])}\n\x1b[1;37m  Data: ${color(hora)}\n\x1b[1;37m  Comando: Não\n\x1b[1;37m  Palavras: ${color(argis.length)}\n\x1b[1;37m  Grupo: ${color(groupName)}\n\x1b[1;37m`)

// Começo dos comandos com prefix
switch(comando) {

case "menu":
   if(!isGroup) return enviar(resposta.grupo)
   enviar(`${menu(prefixo, nomeBot, numeroDono, nomeDono, hora, data, pushname, sender.split("@")[0])}`)
   
   /*   
      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      
      × isGroup =-> Se Estiver Dentro Do Grupo
      × ! =-> Caso Ao Contrário

      × No Caso Em Escrita Seria: Se (if) O Comando Não For Executado Em Um Grupo, Envie Uma Mensagem Na Variável resposta Na Opção grupo (resposta.grupo)
      
      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
      
      × enviar =-> Uma Variável Setada Para Enviar Mensagem

      × Você Também Pode Executar Sem Uma Variável, Basta Troca-lo Por Esse Comando:
      
      cooh.sendMessage(from, { text: `${menu(prefixo, nomeBot, numeroDono, nomeDono, hora, data, pushname, sender.split("@")[0])}` }, { quoted: info })
      
      =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   */

break

default:

}

} catch (erro) {
console.log(erro)
}})

function nocache(module, cb = () => { }) {
console.log(`MÓDULO ${module} sendo observado para mudanças`) 
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)
})}

function uncache(module = ".") {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)
}})}

const status = new Spinner(color(` Inicialização WhatsApp Bot`))
const starting = new Spinner(color(` Preparando-se após a conexão`))
const reconnect = new Spinner(chalk.greenBright(` Reconectar WhatsApp Bot`))

cooh.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update

if(connection === "close") {
status.stop()
reconnect.stop()
starting.stop()
console.log(mylog("Servidor Pronto ✓"))
var shouldReconnect = (lastDisconnect.error.Boom)?.output?.statusCode !== DisconnectReason.loggedOut  

startCooh()
}
if(update.isNewLogin) {
startCooh()
}})}
startCooh()
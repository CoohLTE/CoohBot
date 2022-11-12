require("./arquivos/configurações/dados")
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
const yts = require("yt-search")
const { color, mylog } = require("./Database/Lib/cores")
const ffmpeg = require("fluent-ffmpeg")
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
const speed = require("performance-now")
const { banner, getGroupAdmins, getBuffer, getRandom, getExtension, upload } = require("./Database/Lib/funções")
const { fetchJson } = require("./Database/Lib/fetcher")
const configurações = JSON.parse(fs.readFileSync("./Database/Json/dados.json"))
const registros = JSON.parse(fs.readFileSync("./Database/Json/registros.json"))
const { menu } = require("./Database/Menus/menu.js")
const img = JSON.parse(fs.readFileSync("./Database/Fotos/logo.json"))

logo = img.logo
prefixo = configurações.prefixo
nomeBot = configurações.nomeBot
numeroBot = configurações.numeroBot
nomeDono = configurações.nomeDono
numeroDono = configurações.numeroDono

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
await cooh.sendReadReceipt(info.key.remoteJid, info.key.participant, [info.key.id])
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

// Selo verificado, Peguei da base do black
const verificado = {"key": {"fromMe": false,"participant":"0@s.whatsapp.net", "remoteJid": "557598293339@g.us" }, "message": {orderMessage: {itemCount: 0,status: 4, thumbnail: fs.readFileSync(`./arquivos/fotos/verificado.png`) ,message: `Nick : ${pushname}`,surface: 100, sellerJid: "0@s.whatsapp.net"}}}

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

case "registrar":
case "rg":
if (isRegistro) return enviar(resposta.norg)
try {
registros.push(sender)
fs.writeFileSync("./arquivos/lib/registros.json",JSON.stringify(registros))
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
enviar(`[⚙️️] Registrado com sucesso [❗]

📝 Nome: ${pushname}
📅 Data: ${data}
🕛 Horário: ${hora}

🎉🎈 Parabéns por se registrar 🎈🎉`)
break

case "menu":
case "help":
case "comandos":
if (!isRegistro) return enviar(resposta.registro)
enviar(resposta.espere)
menump3 = fs.readFileSync("./arquivos/audios/menu.mp3")
cooh.sendMessage(from,
{audio: menump3, mimetype: "audio/mp4", ptt:true}, 
{quoted: verificado})
enviarImgB(from, `${logo}`,
menu(prefixo, nomeBot, numeroDono, nomeDono, hora, data, pushname, sender),
"Leia com atenção",
[
{buttonId: `${prefixo}perfil`,
buttonText: {displayText: `🏵️ Perfil 🏵️`}, type: 1},
{buttonId: `${prefixo}dono`,
buttonText: {displayText: `👑 Dono 👑️`}, type: 1},
{buttonId: `${prefixo}ping`,
buttonText: {displayText: `⚡ Ping ⚡`}, type: 1}],
verificado)
break

case "toimg":
if (!isRegistro) return enviar(resposta.registro)
if (!isQuotedSticker) return enviar("[⚙️] Marca uma fig, seu animal [❗]")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "sticker")
enviar(resposta.espere)
try {
cooh.sendMessage(from, {image: buff}, {quoted: verificado})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "perfil":
if (!isRegistro) return enviar(resposta.registro)
try {
ppimg = await cooh.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = logo
}
perfil = await getBuffer(ppimg)
enviar(resposta.espere)
try {
cooh.sendMessage(from, {
image: perfil,
caption: `
[⚙️] Aqui está suas informações [❗]

📝 Nome: ${pushname}
📅 Data: ${data}
🕛 Horário: ${hora}
📱 Número: ${sender.split("@")[0]}
🔰 Wa.me: https://wa.me/${sender.split("@")[0]}
👥 Grupo: ${groupName}
`
}, {quoted: verificado})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "play":
qp = args.join(" ")
res = await yts(qp)
enviar(resposta.espere)
blaimg = await getBuffer(res.all[0].image)

bla = `☂️ Titulo: ${res.all[0].title}\n📉 Visualizações: ${res.all[0].views}\n⏰ Tempo: ${res.all[0].timestamp}\n🔎 Canal: ${res.all[0].author.name}\n ⚙️ Se você não conseguir visualizar os botões, execute o playaudio, playvideo como segunda opção.`

enviarImgB(from, `${res.all[0].image}`, bla, nomeBot, [
{buttonId: `${prefixo}playaudio ${qp}`, buttonText: {displayText: `🎵 Audio`}, type: 1}, {buttonId: `${prefixo}playvideo ${qp}`, buttonText: {displayText: `🎥 Video`}, type: 1}], info)
break

case "playaudio":
enviar(resposta.espere)
bla = await fetchJson(`https://api-team-of-hero.herokuapp.com/api/yt/playmp4?apikey=apiteam&query=${q}`) 
audbla = await getBuffer(bla.url)
cooh.sendMessage(from, {audio: audbla, mimetype: "audio/mp4"}, {quoted: info}).catch(e => {
enviar(resposta.erro)
})
break

case "playvideo":
enviar(resposta.espere)
bla = await fetchJson(`https://api-team-of-hero.herokuapp.com/api/yt/playmp4?apikey=apiteam&query=${q}`) 
audbla = await getBuffer(bla.url)
cooh.sendMessage(from, {video: audbla, mimetype: "video/mp4"}, {quoted: info}).catch(e => {
enviar(resposta.erro)
})
break

case "telegra.ph":    
try {
if (isQuotedImage) {
enviar(resposta.espere)
boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(info).replace("quotedM","m")).message.extendedTextMessage.contextInfo.message.imageMessage : info
owgi = await getFileBuffer(boij, "image")
res = await upload(owgi)
enviar(res)
} else {
enviar("[⚙️] Marque uma imagem, seu baitola [❗]")
}
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "dono":
if (!isRegistro) return enviar(resposta.registro)
enviar(resposta.espere)
await delay(5000)
try {
cooh.sendMessage(from, { contacts: { displayName: "Kawã", contacts: [{ vcard }]
}})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "ping":
if (!isOwner) return enviar(resposta.dono)
if (!isRegistro) return enviar(resposta.registro)
enviar(resposta.espere)
enviar(`[⚙️] Velocidade de resposta ${latensi.toFixed(4)} segundos [❗]`)
break

case "sair":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!isOwner) return enviar(resposta.dono)
try {
await cooh.groupLeave(from)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "executar":
if (!isRegistro) return enviar(resposta.registro)
if (!isOwner) return enviar(resposta.dono)
if (q < 1) return enviar("[⚙️] Vou executar o vento? [❗]")
try {
ev = body.slice(comando.length + 2)
JSON.stringify(eval(ev.replace("await", "")))
} catch(e) {
enviar(e)
console.log(e)
}
break

case "prefix":
if (!isRegistro) return enviar(resposta.registro)
if (!isOwner) return enviar(resposta.dono)
if (q < 1) return enviar("[⚙️] Escolhe um simbolo, seu mongol [❗]")
prefixo = args[0]
configurações.prefixo = prefixo
fs.writeFileSync("./arquivos/configurações/dados.json", JSON.stringify(configurações, null, "\t"))
enviar(`[⚙️] O prefixo foi alterado com sucesso para: ${prefixo} [❗]`)
break

case "fotobot":
if (!isRegistro) return enviar(resposta.registro)
if (!isOwner) return enviar(resposta.dono)
if (!isQuotedImage) return enviar("[⚙️] Marque uma foto, seu corno [❗]")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, "image")
await cooh.updateProfilePicture(numeroBot, buff)
enviar("[⚙️] Foto de perfil alterada com sucesso [❗]")
break

case "clonar":
if (!isRegistro) return enviar(resposta.registro)
if (!isOwner) return enviar(resposta.dono)
if (q < 1) return enviar("[⚙️] Marque a pessoa, mongolóide [❗]")
mentioned = info.message.extendedTextMessage.contextInfo.mentionedJid[0]
let { jid, id, notify } = groupMembers.find(x => x.id === mentioned)
try {
pp = await cooh.profilePictureUrl(id, "image")
buffer = await getBuffer(pp)
cooh.updateProfilePicture(numeroBot, buffer)
mentions(`[⚙️] Foto do perfil atualizada com sucesso, usando a foto do perfil @${id.split("@")[0]} [❗]`, [id], true)
} catch (e) {
console.log(e)
enviar(resposta.erro)
}
break

case "gplink":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
const link = await cooh.groupInviteCode(from)
enviar(`[⚙️] Link do grupo : https://chat.whatsapp.com/${link} [❗]`)
break

case "resetarlink":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await cooh.groupRevokeInvite(from)
enviar("[⚙️] Link de convite resetado com sucesso ✓ [❗]")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "gp":
case "grupo":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
if (q == "abrir") {
await cooh.groupSettingUpdate(from, "not_announcement")
enviar("[⚙️] Grupo aberto com sucesso [❗]")
}
if (q == "fechar") {
await cooh.groupSettingUpdate(from, "announcement")
enviar("[⚙️] Grupo fechado com sucesso [❗]")
}
if (q == "livrar") {
await cooh.groupSettingUpdate(from, "unlocked")
enviar("[⚙️] Grupo livre com sucesso [❗]")
}
if (q == "limitar") {
await cooh.groupSettingUpdate(from, "locked")
enviar("[⚙️] Grupo limitado com sucesso [❗]")
}
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "infogp":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
enviar(`
📝 Nome : ${groupName}
📃 Descrição : ${groupDesc}
🆔 Id : ${from}
📅 Data : ${data}
🕛 Horário : ${hora}
`)
break

case "mudardk":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await cooh.groupUpdateDescription(from, `${q}`)
enviar("[⚙️] Descrição alterada com sucesso ✓ [❗]")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "mudarnm":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await cooh.groupUpdateSubject(from, `${q}`)
enviar("[⚙️] Nome alterado com sucesso ✓ [❗]")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "rebaixar":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (q < 1) return enviar("[⚙️] Digite o número, animal [❗]")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
cooh.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "demote")
enviar(`[⚙️] ${q} Foi rebaixado a membro comum com sucesso [❗]`)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "promover":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if (!groupAdmins) return enviar(resposta.adm)
if (q < 1) return enviar("[⚙️] Cade o número, mongolóide [❗]")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
cooh.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "promote")
enviar(`[⚙️] ${q} Foi promovido a adm com sucesso [❗]`)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "adicionar":
if (!isGroup) return enviar(resposta.grupo)
if (!isRegistro) return enviar(resposta.registro)
if(!isGroupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
if(q.length < 1) return enviar("[⚙️] Vou adicionar o vento blz? [❗]")  
try {
tdt = args[0]
if(tdt.length < 1) return enviar(`[⚙️] Digita o número que deseja adicionar, exemplo: ${prefixo} 556699587805 [❗]`)
if (info.message.extendedTextMessage === null || info.message.extendedTextMessage === undefined) {
enviar("[⚙️] Irei adicionar ele(a) em 5 segundos... [❗]")  
adduser = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
await delay(5000)
response = await cooh.groupParticipantsUpdate(from, [adduser], "add")
o = response.participants[0]
let inv = (Object.values(o))
if(inv[0].code == 409) return enviar("[⚙️] O alvo já está no grupo [❗]")
if(inv[0].code == 403) return enviar("[⚙️] Erro, conta privada do usuário [❗]")
if(inv[0].code == 408) return enviar("[⚙️] rro, usuário acabou de sair [❗]")
if(inv[0].code == 401) return enviar("[⚙️] Erro, porque o bot está bloqueado pelo alvo [❗]")
if(tdt.includes(groupMembers.id.split("@")[0])) return enviar("[⚙️] Esse membro já está no grupo, como você vai adicionar??? [❗]")
} else {
enviar("[⚙️] Irei adicionar ele(a) em 5 segundos... [❗]")  
await delay(5000)
adduser = info.message.extendedTextMessage.contextInfo.participant
response =  await cooh.groupParticipantsUpdate(from,[adduser], "add")
o = response.participants[0]
let inv = (Object.values(o))
if(inv[0].code == 409) return enviar("[⚙️] O alvo já está no grupo [❗]")
if(inv[0].code == 403) return enviar("[⚙️] Falhou, porque em privado [❗]")
if(inv[0].code == 408) return enviar("[⚙️] Falha, porque o alvo acabou de sair [❗]")
if(inv[0].code == 401) return enviar("[⚙️] Falha, porque o bot está bloqueado pelo alvo [❗]")
}
} catch {
enviar("[⚙️] Pronto,  se não for adicionado provavelmente ele privou só para contatos adicionar ele em grupo. [❗]")
}
break

case "banir":
if (!isGroup) return enviar(resposta.grupo)
if (!isGroupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
if (info.message.extendedTextMessage != undefined || info.message.extendedTextMessage != null) {
num = info.message.extendedTextMessage.contextInfo.participant
if(numeroBot.includes(num)) return enviar("[⚙️] felizmente não posso me auto remover, terá que fazer isso manualmente [❗]")
if(numeroDono.includes(num)) return enviar("[⚙️] infelizmente não posso remover meu dono [❗]")
cooh.sendMessage(from, {text: `[⚙️]Adeus ${num.split("@")[0]} [❗]`, mentions: [num]}, {quoted: info})
cooh.groupParticipantsUpdate(from, [num], "remove")
} else { 
enviar("[⚙️] Marque a mensagem da pessoa [❗]")
}
break

default:

// Comandos sem prefix
switch(testat){
}

// Resposta quando o comando não é encontrado
if (isCmd) return enviar(`[⚙️] Comando não encontrado digite ${prefixo}menu para ver a lista de comandos disponíveis [❗]`)

if (budy.includes("bot corno") || (budy.includes("Bot corno"))){
enviar("Corno é você, seu animal")
}
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
const menu = (prefixo, nomeBot, numeroDono, nomeDono, hora, data, pushname, sender) => {
return `
╭━〢⎙ Bem vindo ━━╮
┣ ⩺ Número: ${sender}
┣ ⩺ Nome: ${pushname}
┣ ⩺ Horario: ${hora}
┣ ⩺ Data: ${data}
╰━〢⎙ Ao menu ━━╯

╭━━〢⎙ Info bot ━━╮
┣ ⩺ Prefixo: ${prefixo}
┣ ⩺ Nome Bot: ${nomeBot}
┣ ⩺ Dono: wa.me/+${numeroDono}
┣ ⩺ Nome Dono: ${nomeDono}
╰━━〢⎙ Info bot ️━━╯
`
}
exports.menu = menu
const { PermissionsBitField } = require("discord.js");
const conf = require("../../../../src/configs/sunucuayar.json")
const { cyronixRed } = require("../../../../src/configs/emojis.json")
const emoji = require("../../../../src/configs/emojis.json")
const allah = require("../../../../../../config.json");
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say",
    category: "yetkili",
  },

  run: async (client, message, args, embed) => {
    if(!conf.staffs.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
      message.react(cyronixRed)
      return
    }
    let Tag = conf.tag 

    var takviye = rakam(message.guild.premiumSubscriptionCount)
    var takviyesayı = rakam(message.guild.premiumTier)
    var TotalMember = rakam(message.guild.memberCount)
    var AktifMember = rakam(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let tag = `${rakam(message.guild.members.cache.filter(u => u.user.displayName.includes(Tag)).size)}${Tag ? ` (**${Tag}**)` : ""}`
    var sesli = rakam(message.guild.members.cache.filter((x) => x.voice.channel).size)

  const ozi = message.channel.send({ embeds: [embed
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
			   .setThumbnail(message.guild.iconURL({ dynamic: true}))
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\` ❯ \` Şu anda toplam ${sesli} kişi seslide.
\` ❯ \` Sunucuda ${TotalMember} adet üye var (**${AktifMember}** Aktif)
\` ❯ \` Toplamda ${tag} kişi tagımızı alarak bizi desteklemiş.
\` ❯ \` Toplamda ${takviye} adet boost basılmış!
`)
           ]})
 },
 };

 function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0':  `${emoji.cyronix0}`,
        '1':  `${emoji.cyronix1}`,
        '2':  `${emoji.cyronix2}`,
        '3':  `${emoji.cyronix3}`,
        '4':  `${emoji.cyronix4}`,
        '5':  `${emoji.cyronix5}`,
        '6':  `${emoji.cyronix6}`,
        '7':  `${emoji.cyronix7}`,
        '8':  `${emoji.cyronix8}`,
        '9':  `${emoji.cyronix9}`
      }
      [d];
    })
  }
  return basamakbir;
}
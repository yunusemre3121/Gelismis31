const { Discord, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const canvafy = require('canvafy');
const conf = require("../../../../src/configs/sunucuayar.json");
const ayar = require("../../../../src/configs/ayarName.json");
const { cyronixKalp, cyronixSonsuz, cyronixCeza } = require("../../../../src/configs/emojis.json");

module.exports = {
  conf: {
    aliases: ["ship"],
    name: "ship",
    help: "ship",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
    const mentionedMembers = Array.from(message.mentions.members.values());
    let user = mentionedMembers[0] || message.guild.members.cache.get(args[0]);
    let user2 = mentionedMembers[1] || message.guild.members.cache.get(args[1]);

    const maleRoleIds = conf.erkekRolleri;
    const femaleRoleIds = conf.kizRolleri;

    if (!user && !user2) {
      user = message.member;
      let userGenderRole = null;

      if (maleRoleIds.some(roleId => user.roles.cache.has(roleId))) {
        userGenderRole = 'male';
        user2 = message.guild.members.cache.filter(member => femaleRoleIds.some(roleId => member.roles.cache.has(roleId)) && !member.user.bot).random();
      } else if (femaleRoleIds.some(roleId => user.roles.cache.has(roleId))) {
        userGenderRole = 'female';
        user2 = message.guild.members.cache.filter(member => maleRoleIds.some(roleId => member.roles.cache.has(roleId)) && !member.user.bot).random();
      } else {
        user2 = message.guild.members.cache.filter(member => !member.user.bot && member.id !== message.author.id).random();
      }
    } else if (!user2) {
      user2 = user;
      user = message.member;
    }

    if (user2.user.bot || user.user.bot) {
      return message.channel.send({ content: `> **Botlarla Ship Yapamazsın!**` }).sil(5);
    }

    const specialUserIds = ['1016751053368201256', '1208428060978708590'];
    let customNumber = Math.floor(Math.random() * 101);

    if ((user.id === specialUserIds[0] && user2.id === specialUserIds[1]) || (user.id === specialUserIds[1] && user2.id === specialUserIds[0])) {
      customNumber = 100; 
    }

    let backgroundUrl = message.guild.bannerURL({ extension: "png", size: 2048 });

    console.log("Background URL being used:", backgroundUrl);

    if (!backgroundUrl || !isValidUrl(backgroundUrl)) {
      backgroundUrl = 'https://i.imgur.com/gVngwFw.png'; 
    }

    function isValidUrl(url) {
      try {
        new URL(url); 
        return true;
      } catch (e) {
        return false;
      }
    }

    try {
      const ship = await new canvafy.Ship()
        .setAvatars(user.user.displayAvatarURL({ dynamic: true, extension: "png" }), user2.user.displayAvatarURL({ dynamic: true, extension: "png" }))
        .setBackground("image", backgroundUrl)
        .setBorder("#ff1d8e")
        .setCustomNumber(customNumber)
        .setOverlayOpacity(0.5)
        .build();

      await message.reply({
        content: `> uooo sizi aşıklar sizi evlenin lann **${user.user.tag} ❓ ${user2.user.tag}**`,
        files: [{
          attachment: ship,
          name: `ship-${message.member.id}.png`
        }]
      });

    } catch (error) {
      console.error('Error while generating ship:', error);
      message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }
};
//importa biblioteca q fornece a api pro bot
const { Telegraf } = require('telegraf');
//biblioteca do prisma q permite interagir com banco de dados
const { PrismaClient } = require('@prisma/client');
//comentarios gerais:

// cria uma nova instância do bot Telegram
const bot = new Telegraf("7084471057:AAE_NnBN0lz1jtGVP6cAoAGzj6Bu8rLYnUU");
// Inicializa o Prisma Client
const prisma = new PrismaClient();
// define o comportamento do bot ao receber uma mensagem

bot.start((ctx) => ctx.reply('Olá! Eu sou o seu bot de atendimento. Como posso ajudar?'));

bot.on('text', async (ctx) => {
  const now = new Date();
  const hour = now.getHours();

  // verifica se a mensagem foi enviada durante o horário comercial (9:00 às 18:00)
  if (hour >= 9 && hour < 18) {
    ctx.reply('Olá Ana Carolina Berlando portadora do CPF 115.430.687-90, moradora da Rua Jose Antonio Rosa, Bairro da Fiat - Guacui, Visite: https://faesa.br');
  } else {
    // fora do horário, solicita o e-mail do usuário
    ctx.reply('Estamos fechados agora, o horário de funcionamento da empresa é de 09:00 às 18:00. Por favor, informe seu e-mail para contato:');
    
    // aguarda a resposta do usuário
    bot.on('text', async (ctx) => {
      const email = ctx.message.text;
      // salva o e-mail no banco de dados usando o Prisma
      await prisma.email.create({ data: { address: email } });
      ctx.reply('Obrigado! Seu e-mail foi registrado para contato.');
    });
  }
});
bot.launch();
console.log('Bot is running..');
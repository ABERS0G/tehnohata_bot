import TelegramApi from 'node-telegram-bot-api'
import express, {Router} from 'express'

const token = '6125349040:AAGHAMF-xj0PhgB4zy7OJz2qYrBj_KMyXCA';
const bot = new TelegramApi(token, {polling: true});

bot.on('chat_member', async msg=> {

    if(msg.new_chat_member.status === 'left'){
        return
    }

    await sleep(3000)

    let chatId = msg.chat.id
    console.log(msg)
    let str = `<b>Ласкаво просимо${msg.from.first_name?', '+msg.from.first_name:''}${msg.from.last_name?' '+msg.from.last_name:''}!</b>\n\n`+ (msg.invite_link?'<i>Сайт: '+msg.invite_link.name + '</i>':'')
    bot.sendMessage(chatId, str, {parse_mode: 'HTML'})
})

let sleep = function (ms){
    return new Promise((resolve) => setTimeout(resolve, ms) );
}

//Server
const hostname = 'localhost';
const PORT = process.env.PORT || 3000
const app = express()
const routs = Router()

app.use(routs)

routs.get('/', (req, res)=>{
    res.send('OK')
})

app.listen(PORT, hostname, ()=>{
    console.log('Server started!')
})

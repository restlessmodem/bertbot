/* bertbot - A node.js app to control a private Telegram bot
SO of erniebot; Christopher Pfister © 2020 */

// Modules
const express = require('express');
const app = express();
var needle = require('needle');
app.use(express.json());
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.raw({type: 'application/octet-stream'}));

// Init 
var credentials = JSON.parse(fs.readFileSync('.credentials').toString());
eval(fs.readFileSync('telegramActions.js')+'');
eval(fs.readFileSync('cron.js')+'');
const port = process.env.PORT || 8080;
global.reminderInterval = null;
const project = 'bertbot-nodejs';
const location = 'europe-west3';

// Init Google Cloud Storage
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('bertbot-nodejs.appspot.com');

// Load Sunflower Game
eval(fs.readFileSync('sunflowerGame.js')+'');

// Request Handling
app.post('/' + credentials.telegram, function (req, res) {
  var msg = req.body.message;
  if (msg != null && msg.text != null) {
    if (msg.text.indexOf("/") == 0) { // slash is first character
      handleCommand(msg);
      console.log("Received Command '" + req.body.message.text + "' in chat " + msg.chat.id)
    } else {
      handleText(msg);
      console.log("Received Text '" + req.body.message.text + "' in chat " + msg.chat.id)
    }
  } else {
    console.log("Received non-text message. Ignoring.");
  }

  res.status(200).send('Received!');
  res.end();
});

app.get('/', function(req, res) {
  res.status(200).send('<h1>Hi, I am Bert!</h1> I am a telegram-bot, so I am not very useful in a webbrowser. But I\'m happy you are visiting me here! Also visit my SO ernie, the telegram-bot! :)<br/><br/>© 2020 Christopher Pfister');
});
app.use(function(req, res, next) {res.status(404).send('Not existing!');});
app.listen(port, () => console.log(`Server started on port ${port}!`));

// Handling command-type messages prefixed with /
function handleCommand(msg) {
  // Collect message data
  var command = "";
  if (msg.text.indexOf("@") > -1)
    command = msg.text.split("@")[0];
  else
    command = msg.text;

  if (command == '/love') {
    sendPhoto("https://lh3.googleusercontent.com/ePuki9d5DmmrEB9QMsxW8afogbyuVXTwMfpAGqNIC6vs2GwjHdmd2yn0s_WA9_rY_8v23PTv0M2FeIKdoAbLYWVpWNaBr9fIl9p7vu83VksGxxsnttPHd1zajNAqUspI6azbHcTIXiuK2iWVFwF646380u9FQ_t1noasduE4zj1Vy8DTpi1rETDcPHSDlSxJXZzGdlaVSDyJ9sraNL5RVY1i-qQNqz1FCmGaM98uxKwua09vStGAtXVHIfL_tYS3mtrnV93JOe7_j1JlUqPIRE7blrZDXcCUntwKyt6xYO_icYU-a3SVrdaHeUVjYS8YdBCK9IQNdCakH4LqHOnc8UvO1BOloYERIbYVS4l2mCOLCuQx9ouPULK_sumLpVCjhNbalAKi1ptuNwwDmzlZRBVvSvJC-KXqz8dcVJ6uY66XaVShU-yLaq1Be5wIU8b1bZy10ZQmLW25nhBSl0hq13wrUXcjfc_CLT5JpQPq4nVrcBWI4Db2JOjNpmtX7Ds2uO5PU-mhMRjJsNEg1dnWI497CcCXFgzPoRUqfc6_nzhD7z-pUQHryX_JlOe32gwHu-0A0f2RsHl7JuqoC27scSbpmQ921KpfZiySy-_pNWRnweCr7i-Os_G7lMPnpeZsDStl4ngYDk9e_Pppbcv7_Tj68n7OyW7w4AZFapqDIx0w2vcKHu83PyR5WoHP3JGYvvs1lkT2Km6pyf3lq9C1IaPi=w679-h905-no", msg.chat.id, "I love you too!!!");
  } else if (command == '/heartme') {
    sendMessage("♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥", msg.chat.id);
  } else if (command == '/hug') {
    sendPhoto("https://lh3.googleusercontent.com/AkdmHRLSG3gMQnx_8_Z1ywzvLbbe1SjrvEk-qiqnTJ-uh6BEYR98C6vgqjbI2R7MG8YAniyMklDRN4nQGvgm_n9ni-6jsKWD-kl34dr9d6rvJRRfS9XPTMnrCmqCngPBWq2LC-g7E4V84AbOxL5O37VHHlf3k-lgAwqWT6TLPPn00nQgtmtRg8RUVVTpYeBfzrJH1-d7UpMlKy6LdQQP09kUZjpdhCVG1xMtBx7bWLAGvMMLr9JTyFyXl3zqCnaPh4y4DWqGApYkgIPgozWQualE5nOD9Cz7nVch8a02pawgunUkvZMmN5phTGNXrCTwo7qKd9gjpHH4hRmjE79SBb0-oqwLhzQ_4I_7dQqUyukMPcBjBi3v5pq2IHyVlLYI-Wt3xm5Qc_S6Y0nyA31GkslPJuxstZGKtVDYa_W2ydsOMscqwTKfxJ7dkD090GaQlDePPbq4eI2JYf9MmM1u8-2vKTnjMFlVpIxxaRfmePkMNxruzHZT_dRAM08PCReUcUPiGPPdMzTjzvvaVELFwDvJckSBmukPls0lIYaBRt3kxqCcyWbwK0sJTkXK74041xSUiZqyWuRY5VBdO7YFtVRJe3PAYSE3t0DrKpvdSagvtOJUTHZwrvluN3IsQMrO2Ga-7nUVuKFe8x6H_I7zAUG5FkILv74KN6A7CgaTfK0mb9X1VT5wOO7EDarZrFaA8C7xeM1VHBDm3AwopQ1pMhJ8=w679-h905-no", msg.chat.id, "<3 <3 <3");
  } else if (command == '/dismiss') {
    sendMessage("Dismissed any active reminders!", msg.chat.id);
    unpinMessage(msg.chat.id)
    clearInterval(global.reminderInterval);
  } else if (command == '/start') {
    sendMessage("Hi! You are my new friend now! Talk to me using any of the available commands! Also visit my SO Ernie!", msg.chat.id);
  } else if (command.indexOf("/remindme") > -1) {
    if (command.indexOf(":") > -1 && command.indexOf("-") > -1) {
      var reminderMessage = command.split(":")[1];
      var minutes = parseInt(command.split("-")[1].trim());
      sendMessage("Hi! Reminder in " + minutes + " minute(s)!", msg.chat.id);
      scheudeleMessage(project, location, reminderMessage, minutes)
    } else {
      sendMessage("Ask me to remind you by writing\n\"/remindme: Take the trash out - 5\" (Minutes)", msg.chat.id);
    }
  } else if (command == '/sunflowergame') {
    // Sunflower Game - Prompt
    sfg_main_prompt(msg);
  } else if (command.indexOf("/solve") > -1) {
    // Sunflower Game - Solve
    sfg_main_solve(msg, command);
  } else {
    sendMessage("What", msg.chat.id);
  }
}

// Handling non-command messages
function handleText(msg) {
  if (msg.text.indexOf("I love you Bert") > -1) {
    sendMessage("I love you too, " + msg.from.first_name + "!", msg.chat.id);
  } else if (msg.text.match(/^a[a*]*A$/i)) { // contains only As
    var aaaString = "";
    for (var i = 0; i <= msg.text.length * 2; i++) {
      aaaString = aaaString + "a"
    }
    sendMessage(aaaString + ", " + msg.from.first_name + "!", msg.chat.id);
  }
}
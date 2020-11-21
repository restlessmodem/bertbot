/* Sends a text message {text} to chat with {chat_id} */
function sendMessage(text, chat_id, pin = false) {
  needle.post('https://api.telegram.org/' + credentials.telegram + '/sendMessage', {
    chat_id: chat_id,
    text: text,
    reply_markup: '{"remove_keyboard": true}'
  }, function(err, resp, body){
      console.log("Sent message: " + text + " to chat " + chat_id);
      if (pin)
        pinMessage(chat_id, resp.body.result.message_id)
  });
}

function pinMessage(chat_id, message_id) {
  needle.post('https://api.telegram.org/' + credentials.telegram + "/pinChatMessage", {
    chat_id: chat_id,
    message_id: message_id,
    disable_notification: true
  }, function(err, resp, body){
    console.log("Pinned message!");
  })
}
function unpinMessage(chat_id) {
  needle.post('https://api.telegram.org/' + credentials.telegram + "/unpinChatMessage", {
    chat_id: chat_id,
  }, function(err, resp, body){
    console.log("Unpinned message!");
  })
}

/* Downloads a photo from {url} and sends it to chat with {chat_id} optionally including caption {caption} */
function sendPhoto(url, chat_id, caption = null) {
  needle.post('https://api.telegram.org/' + credentials.telegram + '/sendPhoto', {
    chat_id: chat_id,
    caption: caption,
    photo: url
  }, function(err, resp, body){
      console.log("Sent photo to chat " + chat_id);
  });
}

async function scheudeleMessage(project, location, text, minutes) {
  // Imports the Google Cloud Tasks library.
  const {CloudTasksClient} = require('@google-cloud/tasks');

  // Instantiates a client.
  const client = new CloudTasksClient();

  // TODO(developer): Uncomment these lines and replace with your values.
  const queue = 'bertsTasks';
  const inSeconds = minutes * 60;

  // Construct the fully qualified queue name.
  const parent = client.queuePath(project, location, queue);

  const task = {
    appEngineHttpRequest: {
      httpMethod: 'POST',
      relativeUri: '/task/' + credentials.telegram + '/sendMessage',
    },
  };

  var reminderText = text.split("-")[0].trim() + " (" + minutes + " minutes ago)"
  task.appEngineHttpRequest.body = Buffer.from(reminderText).toString('base64');
  task.scheduleTime = {
      seconds: inSeconds + Date.now() / 1000,
  };

  const request = {
    parent: parent,
    task: task,
  };

  console.log('Sending task:');
  console.log(task);
  // Send create task request.
  const [response] = await client.createTask(request);
  const name = response.name;
  console.log(`Created task ${name}`);
}
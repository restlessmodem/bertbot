// Cron
app.get('/cron/' + credentials.telegram + '/morning', function (req, res) {
    sendMessage("Good morning, everyone!", -1001488246059);
    res.status(200).send();
    res.end();
});
app.get('/cron/' + credentials.telegram + '/night', function (req, res) {
    sendMessage("Good night, everyone!", -1001488246059);
    res.status(200).send();
    res.end();
});

app.get('/cron/' + credentials.telegram + '/ernierand', function (req, res) {
    var d = Math.random();
    if (d < 0.05)
        sendMessage("I LOVE ERNIE!", -1001488246059); // 5% chance

    res.status(200).send();
    res.end();
});



// Tasks Queue
app.post('/task/' + credentials.telegram + '/sendMessage', function (req, res) {
    sendMessage("Reminder: " + req.body, -1001488246059);
    res.status(200).send('Received!');
    res.end();
});

const { v4: uuidv4 } = require('uuid');
const { formatDistanceToNow, subMonths, subHours } = require('date-fns');


// Dummy data for messages
const messages = [
  {
    id: uuidv4(), 
    name: "Amando",
    subject: "Stressing on school",
    message: "Set up a basic Express app by installing Express and EJS. Set up a basic index route and run your server. Create the required folders and files as discussed in the previous lessons.",
    added: subMonths(new Date(), 1)
  },
  {
    id: uuidv4(), 
    name: "Randynang",
    subject: "About debt",
    message: "Set up a basic Express app by installing Express and EJS. Set up a basic index route and run your server. Create the required folders and files as discussed in the previous lessons.",
    added: subHours(new Date(), 4)
  },
  {
    id: uuidv4(), 
    name: "Grandift",
    subject: "Land scape",
    message: "Set up a basic Express app by installing Express and EJS. Set up a basic index route and run your server. Create the required folders and files as discussed in the previous lessons.",
    added: subHours(new Date(), 10)
  },
  {
    id: uuidv4(), 
    name: "Salamanda",
    subject: "Finance rate",
    message: "Set up a basic Express app by installing Express and EJS. Set up a basic index route and run your server. Create the required folders and files as discussed in the previous lessons.",
    added: subHours(new Date(), 14)
  },
];

const message = (req, res) => {
  // Sort messages from newest to oldest
  const sortedMessages = messages
    .sort((a, b) => b.added - a.added)
    .map(msg => ({
      ...msg,
      timeAgo: formatDistanceToNow(new Date(msg.added), { addSuffix: true })
    }));

  res.render('message', { messages: sortedMessages });
};

const details = (req, res) => {
  const id = req.params.id;
  const selectMessage = messages.find(message => message.id === id);

  if (selectMessage) {
    res.render('details', { message: selectMessage });
  } else {
    res.status(404).send('Message not found');
  }
};

const deleteM = (req, res) => {
  const messageId = req.params.messageId;

  const messageIndex = messages.findIndex(message => message.id === messageId);
  if (messageIndex !== -1) {
    messages.splice(messageIndex, 1);
    res.redirect('/');
    res.status(200).send('Message deleted');
  } else {
    res.status(404).send('Message not found');
  }
}; 

const send = async (req, res) => {
    const { name_one, subject_one, message_one } = req.body;

    if (name_one && subject_one && message_one) { 
        const newMessage = await {
            id: uuidv4(),
            name: name_one,
            subject: subject_one,
            message: message_one,
            added: new Date()
        };
        messages.push(newMessage);
        return res.redirect('/'); // Redirect to the home page after successful submission
    } else {
        return res.status(400).send('All fields are required');
    }
};


const form = (req, res) => {
  res.render('form');
};

module.exports = {
  message,
  details,
  form,
  deleteM,
  send
};

const mongoose = require('mongoose');
const io = require('socket.io')(3000, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb://localhost:27017/OrderEase",);


const feedbackSchema = new mongoose.Schema({
  feedbacks: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  ]
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

io.on('connection', (socket) => {
  console.log('New connection', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected ', socket.id);
  });

  socket.on('send-feedback', async (data) => {
    console.log('Received feedback:', data);
    try {
      const { id } = data;

      
      let feedbackDoc = await FeedbackModel.findOne({});

      if (!feedbackDoc) {
       
        feedbackDoc = new FeedbackModel({ feedbacks: [] });
      }

      const feedbackExists = feedbackDoc.feedbacks.some(feedback => feedback.id === id);
      if (feedbackExists) {
        console.log('Feedback with this ID already exists:', id);
        return;
      }

      feedbackDoc.feedbacks.push(data);

      await feedbackDoc.save();


      

    } catch (error) {
      console.error('Error handling feedback:', error);
    }
  });
});

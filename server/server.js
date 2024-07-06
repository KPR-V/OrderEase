const io = require('socket.io')(3000, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
  });
  
  const feedbackArray = [];
  
  io.on('connection', (socket) => {
    console.log('New connection' ,socket.id);
    socket.on('disconnect', () => {
      console.log('User disconnected ', socket.id);
    });
    socket.on('send-feedback', (data) => {
    //   console.log('Feedback received', data);
      const id = data.id;
      if (feedbackArray.some(feedback => feedback.id === id)) {
        return;
      } else {
        feedbackArray.push(data);
      }
        // feedbackArray.clear()
      socket.emit('all-feedbacks', feedbackArray);
      // Log the array of feedbacks
      console.log('All feedbacks:', feedbackArray);
    });
  });
  
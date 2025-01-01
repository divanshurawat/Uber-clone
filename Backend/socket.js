const socketio = require('socket.io');
const userModel= require('./models/user.model');
const captainModel= require('./models/captain.model');

let io;

const initializeSocket = (Server) => {
    io = socketio(Server, { 
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            if(userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                }); 
            }else{
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                });
            }
            
        });

        socket.on('update-location-captain', async (data)=>{
            const {userId, location}=data;

            if(!location || !location.ltd || !location.lng) {
                return socket.emit('error',{message: 'Location is required'});
            }
            
            const updateResult = await captainModel.findByIdAndUpdate(
                userId,
                {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                },
                { new: true, upsert: true } // Ensures the location field is created if missing
            );
            
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io not initialized');
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

import { io } from 'socket.io-client';

// https://mak-server.onrender.com
// http://localhost:5000
const URL = 'https://mak-server.onrender.com';
const socket = io(URL)
export default socket
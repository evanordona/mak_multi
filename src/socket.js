import { io } from 'socket.io-client';

// https://mak-server.onrender.com
// http://localhost:5000
//'https://lordsduel-api.fly.dev'
const URL = 'https://lordsduel-api.fly.dev';
const socket = io(URL)
export default socket
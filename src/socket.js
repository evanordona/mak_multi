import { io } from 'socket.io-client';

const URL = 'https://mak-server.onrender.com';
const socket = io(URL)
export default socket
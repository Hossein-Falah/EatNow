import { Server } from "socket.io";

class SocketService {
    private io:Server;

    constructor(io:Server) {
        this.io = io
    }

    initializeConnection() {
        
    }
}

export default SocketService;
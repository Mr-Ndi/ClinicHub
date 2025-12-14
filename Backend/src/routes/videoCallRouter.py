from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict

videoCallRouter = APIRouter(prefix="/api/video", tags=["VideoCall"])

active_connections: Dict[str, WebSocket] = {}

@videoCallRouter.websocket("/ws/{room_id}")
async def video_call_socket(websocket: WebSocket, room_id: str):
    await websocket.accept()
    active_connections[room_id] = websocket
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast to all in the room (simple 1-1 for now)
            for rid, ws in active_connections.items():
                if rid == room_id and ws != websocket:
                    await ws.send_text(data)
    except WebSocketDisconnect:
        del active_connections[room_id]

from fastapi import FastAPI, Form
import asyncio
from fastapi.responses import JSONResponse 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .model.py import *


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    user_input: str
    session_id: str

async def generate_response_stream(user_input: str, session_id: str):
    for token in process_input(user_input, session_id):
        yield token + "\n" 
        await asyncio.sleep(0.1)  

@app.post("/chat", response_class=JSONResponse)
async def chat(user_input: UserInput):
    session_id = user_input.session_id
    response = process_input(user_input.user_input, session_id)
    return {"response": response} 
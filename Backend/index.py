from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn

app = FastAPI(
    docs_url="/docs",
    title="Clinichub Backend API",
    redoc_url=None,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Ubutumwa": "Server iri tayali !"}

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=2739, reload=True)
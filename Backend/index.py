
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn
from src.routes.patientRouter import patientRouter
from src.routes.doctorRouter import doctorRouter
from src.routes.oauthRouter import oauthRouter


app = FastAPI(
    docs_url="/docs",
    title="Clinichub Backend API",
    redoc_url=None,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)



# Define allowed origins for CORS
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(patientRouter)
app.include_router(doctorRouter)
app.include_router(oauthRouter)

@app.get("/")
async def read_root():
    return {"Ubutumwa": "Server iri tayali !"}

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=2739, reload=True)
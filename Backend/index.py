from fastapi import FastAPI
import uvicorn

app = FastAPI()

print("Hey checkout the swagger on \n-----------------\n\t http://127.0.0.1:2739/docs\n-----------------")
@app.get("/")
async def read_root():
    return {"Ubutumwa": "Server iri tayali !"}

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=2739, reload=True)
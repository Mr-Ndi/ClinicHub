from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.stockController import (
	create_stock_controller,
	get_stock_controller,
	update_stock_controller,
	delete_stock_controller,
	list_stock_controller
)
from src.Utils.db import get_db

stockRouter = APIRouter(prefix="/api/stock", tags=["Stock"])

@stockRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_stock(item: dict = Body(...), db: Session = Depends(get_db)):
	return create_stock_controller(db, item)

@stockRouter.get("/{item_id}")
def get_stock(item_id: str, db: Session = Depends(get_db)):
	return get_stock_controller(db, item_id)

@stockRouter.put("/{item_id}")
def update_stock(item_id: str, item: dict = Body(...), db: Session = Depends(get_db)):
	return update_stock_controller(db, item_id, item)

@stockRouter.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stock(item_id: str, db: Session = Depends(get_db)):
	return delete_stock_controller(db, item_id)

@stockRouter.get("/")
def list_stock(db: Session = Depends(get_db)):
	return list_stock_controller(db)

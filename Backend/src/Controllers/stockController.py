
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.stockservices import (
	create_stock_item,
	get_stock_item,
	update_stock_item,
	delete_stock_item,
	list_stock_items
)

def create_stock_controller(db: Session, item: dict):
	stock = create_stock_item(db, item)
	if not stock:
		raise HTTPException(status_code=400, detail="Stock item creation failed")
	return stock

def get_stock_controller(db: Session, item_id: str):
	stock = get_stock_item(db, item_id)
	if not stock:
		raise HTTPException(status_code=404, detail="Stock item not found")
	return stock

def update_stock_controller(db: Session, item_id: str, item: dict):
	updated = update_stock_item(db, item_id, item)
	if not updated:
		raise HTTPException(status_code=404, detail="Stock item not found")
	return updated

def delete_stock_controller(db: Session, item_id: str):
	deleted = delete_stock_item(db, item_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Stock item not found")
	return {"message": "Stock item deleted"}

def list_stock_controller(db: Session):
	return list_stock_items(db)

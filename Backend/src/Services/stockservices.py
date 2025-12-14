
from src.Models.stockmodel import StockItem
from uuid import uuid4

def create_stock_item(db, item: dict):
	stock = StockItem(
		id=uuid4(),
		name=item.get("name"),
		quantity=item.get("quantity", 0),
		unit=item.get("unit"),
		description=item.get("description")
	)
	db.add(stock)
	db.commit()
	db.refresh(stock)
	return stock

def get_stock_item(db, item_id: str):
	return db.query(StockItem).filter(StockItem.id == item_id).first()

def update_stock_item(db, item_id: str, item: dict):
	stock = db.query(StockItem).filter(StockItem.id == item_id).first()
	if not stock:
		return None
	for field, value in item.items():
		setattr(stock, field, value)
	db.commit()
	db.refresh(stock)
	return stock

def delete_stock_item(db, item_id: str):
	stock = db.query(StockItem).filter(StockItem.id == item_id).first()
	if not stock:
		return None
	db.delete(stock)
	db.commit()
	return stock

def list_stock_items(db):
	return db.query(StockItem).all()

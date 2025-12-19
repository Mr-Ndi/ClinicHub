
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from src.Services.stockservices import (
	create_stock_item,
	get_stock_item,
	update_stock_item,
	delete_stock_item,
	list_stock_items
)

def create_stock_controller(db: Session, item: dict):
	try:
		stock = create_stock_item(db, item)
		if not stock:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Stock item creation failed. Please check your input data."
			)
		return stock
	except HTTPException:
		# Re-raise HTTPException as-is to preserve the detailed error message
		raise
	except Exception as e:
		# Log the full error for debugging
		import traceback
		print(f"Unexpected error in create_stock_controller: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to create stock item: {str(e)}"
		)

def get_stock_controller(db: Session, item_id: str):
	stock = get_stock_item(db, item_id)
	if not stock:
		raise HTTPException(status_code=404, detail="Stock item not found")
	return stock

def update_stock_controller(db: Session, item_id: str, item: dict):
	try:
		updated = update_stock_item(db, item_id, item)
		if not updated:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Stock item not found"
			)
		return updated
	except HTTPException:
		raise
	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to update stock item: {str(e)}"
		)

def delete_stock_controller(db: Session, item_id: str):
	try:
		deleted = delete_stock_item(db, item_id)
		if not deleted:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail="Stock item not found"
			)
		return {"message": "Stock item deleted successfully"}
	except HTTPException:
		raise
	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to delete stock item: {str(e)}"
		)

def list_stock_controller(db: Session):
	try:
		return list_stock_items(db)
	except HTTPException:
		raise
	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to retrieve stock items: {str(e)}"
		)

from fastapi import APIRouter, Depends, status, Body, HTTPException
from sqlalchemy.orm import Session
import traceback
from src.Controllers.stockController import (
	create_stock_controller,
	get_stock_controller,
	update_stock_controller,
	delete_stock_controller,
	list_stock_controller
)
from src.Utils.db import get_db
from src.Utils.dependencies import require_admin
from src.Middlewares.userpydanticmodel import StockItemCreate, StockItemUpdate

stockRouter = APIRouter(prefix="/api/stock", tags=["Stock"])

@stockRouter.post("/", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def create_stock(item: StockItemCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
	"""
	Create a new stock item.
	Requires admin authentication.
	Accepts camelCase fields from frontend and converts to snake_case for backend.
	"""
	try:
		# Convert Pydantic model to dict with snake_case keys
		item_dict = item.to_dict()
		print(f"📥 Received stock item (camelCase): {item.model_dump()}")
		print(f"📥 Converted to snake_case: {item_dict}")
		return create_stock_controller(db, item_dict)
	except HTTPException:
		# Re-raise HTTPException to preserve error details
		raise
	except Exception as e:
		# Catch any unexpected errors and convert to HTTPException
		print(f"Unexpected error in create_stock route: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to create stock item: {str(e)}"
		)

@stockRouter.get("/{item_id}", dependencies=[Depends(require_admin)])
def get_stock(item_id: str, db: Session = Depends(get_db), admin=Depends(require_admin)):
	return get_stock_controller(db, item_id)

@stockRouter.put("/{item_id}", dependencies=[Depends(require_admin)])
def update_stock(item_id: str, item: StockItemUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
	"""
	Update an existing stock item.
	Requires admin authentication.
	Accepts camelCase fields from frontend and converts to snake_case for backend.
	"""
	# Convert Pydantic model to dict with snake_case keys
	item_dict = item.to_dict()
	print(f"📥 Updating stock item {item_id} with data: {item_dict}")
	return update_stock_controller(db, item_id, item_dict)

@stockRouter.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
def delete_stock(item_id: str, db: Session = Depends(get_db), admin=Depends(require_admin)):
	return delete_stock_controller(db, item_id)

@stockRouter.get("/", dependencies=[Depends(require_admin)])
def list_stock(db: Session = Depends(get_db), admin=Depends(require_admin)):
	return list_stock_controller(db)


from src.Models.stockmodel import StockItem
from uuid import uuid4
from sqlalchemy.exc import SQLAlchemyError, IntegrityError, OperationalError
from fastapi import HTTPException, status

def create_stock_item(db, item: dict):
	from datetime import datetime
	
	try:
		# Validate required fields
		if not item.get("name"):
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Item name is required"
			)
		
		# Parse expiry_date if it's a string - handle multiple formats
		expiry_date = item.get("expiry_date")
		if expiry_date and isinstance(expiry_date, str):
			expiry_date = expiry_date.strip()
			date_formats = ["%Y-%m-%d", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y", "%Y/%m/%d"]
			parsed = None
			for fmt in date_formats:
				try:
					parsed = datetime.strptime(expiry_date, fmt).date()
					break
				except ValueError:
					continue
			
			if parsed is None:
				raise HTTPException(
					status_code=status.HTTP_400_BAD_REQUEST,
					detail=f"Invalid expiry date format: '{expiry_date}'. Please use YYYY-MM-DD, DD/MM/YYYY, or MM/DD/YYYY format."
				)
			expiry_date = parsed
		
		stock = StockItem(
			id=uuid4(),
			name=item.get("name"),
			category=item.get("category"),
			quantity=item.get("quantity", 0),
			unit=item.get("unit"),
			supplier=item.get("supplier"),
			cost_per_unit=item.get("cost_per_unit", 0.0),
			expiry_date=expiry_date,
			location=item.get("location"),
			description=item.get("description"),
			min_stock_level=item.get("min_stock_level", 0)
		)
		print(f"Creating stock item: {item.get('name')}")  # Debug log
		db.add(stock)
		db.commit()
		db.refresh(stock)
		print(f"Stock item created successfully: {stock.id}")  # Debug log
		return stock
	except HTTPException:
		raise
	except OperationalError as e:
		# Catch OperationalError FIRST (before SQLAlchemyError) since it's more specific
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		print(f"OperationalError caught: {error_msg}")  # Debug log
		if "column" in error_msg.lower() and "does not exist" in error_msg.lower():
			# Extract column name from error
			missing_col = ""
			try:
				parts = error_msg.split("column")[1].split("does not exist")[0].strip().strip('"').strip("'")
				missing_col = parts
			except:
				pass
			detail_msg = f"Database schema error: Column '{missing_col}' is missing from stock_items table. Please run the database migration script (Backend/scripts/create_stock_table.py) or contact the administrator."
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail=detail_msg
			)
		elif "relation" in error_msg.lower() and "does not exist" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail="Database table 'stock_items' does not exist. Please run the database setup script (Backend/scripts/create_stock_table.py) or contact the administrator."
			)
		else:
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail=f"Database error occurred: {error_msg}. Please contact support."
			)
	except IntegrityError as e:
		# Catch IntegrityError before SQLAlchemyError
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		print(f"IntegrityError caught: {error_msg}")  # Debug log
		if "duplicate" in error_msg.lower() or "unique" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="A stock item with this name already exists. Please use a different name."
			)
		elif "foreign key" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Invalid reference. Please check the provided data."
			)
		else:
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Failed to create stock item. The data may be invalid or duplicate."
			)
	except SQLAlchemyError as e:
		# Catch other SQLAlchemy errors last
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		print(f"SQLAlchemyError caught: {error_msg}")  # Debug log
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Database error: {error_msg}. Please check your data and try again."
		)
	except Exception as e:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"An unexpected error occurred: {str(e)}"
		)

def get_stock_item(db, item_id: str):
	return db.query(StockItem).filter(StockItem.id == item_id).first()

def update_stock_item(db, item_id: str, item: dict):
	from datetime import datetime
	
	try:
		stock = db.query(StockItem).filter(StockItem.id == item_id).first()
		if not stock:
			return None
		
		# Handle expiry_date conversion if present
		if "expiry_date" in item and item["expiry_date"]:
			if isinstance(item["expiry_date"], str):
				try:
					item["expiry_date"] = datetime.strptime(item["expiry_date"], "%Y-%m-%d").date()
				except ValueError:
					raise HTTPException(
						status_code=status.HTTP_400_BAD_REQUEST,
						detail="Invalid expiry date format. Please use YYYY-MM-DD format"
					)
		
		for field, value in item.items():
			if hasattr(stock, field):
				setattr(stock, field, value)
		
		db.commit()
		db.refresh(stock)
		return stock
	except HTTPException:
		raise
	except IntegrityError as e:
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Failed to update stock item. The data may be invalid or duplicate."
		)
	except OperationalError as e:
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		if "column" in error_msg.lower() and "does not exist" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail="Database schema error. Please contact the administrator."
			)
		else:
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail="Database error occurred. Please try again later."
			)
	except SQLAlchemyError as e:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to update stock item. Please try again later."
		)
	except Exception as e:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"An unexpected error occurred: {str(e)}"
		)

def delete_stock_item(db, item_id: str):
	try:
		stock = db.query(StockItem).filter(StockItem.id == item_id).first()
		if not stock:
			return None
		db.delete(stock)
		db.commit()
		return stock
	except IntegrityError as e:
		db.rollback()
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		if "foreign key" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_400_BAD_REQUEST,
				detail="Cannot delete this stock item because it is being used elsewhere in the system."
			)
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Failed to delete stock item. Please try again."
		)
	except SQLAlchemyError as e:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to delete stock item. Please try again later."
		)
	except Exception as e:
		db.rollback()
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"An unexpected error occurred: {str(e)}"
		)

def list_stock_items(db):
	try:
		return db.query(StockItem).all()
	except OperationalError as e:
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		if "column" in error_msg.lower() and "does not exist" in error_msg.lower():
			missing_col = error_msg.split("column")[1].split("does not exist")[0].strip().strip('"').strip("'")
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail=f"Database schema error: Column '{missing_col}' is missing from stock_items table. Please run the database migration script (Backend/scripts/create_stock_table.py) or contact the administrator."
			)
		elif "relation" in error_msg.lower() and "does not exist" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail="Database table 'stock_items' does not exist. Please run the database setup script (Backend/scripts/create_stock_table.py) or contact the administrator."
			)
		else:
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail=f"Database error while fetching stock items: {error_msg}. Please contact support."
			)
	except SQLAlchemyError as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to retrieve stock items. Please try again later."
		)
	except Exception as e:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"An unexpected error occurred while fetching stock items: {str(e)}"
		)

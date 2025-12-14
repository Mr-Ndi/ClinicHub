from sqlalchemy.orm import Session
from src.Models.usermodel import User, UserRole
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from uuid import uuid4

def create_user_admin(db: Session, user: UserRegister):
	db_user = User(
		id=uuid4(),
		name=user.name,
		email=user.email,
		phone=user.phone,
		address=user.address,
		password=user.password,  # Hash in real use
		role=user.role,
		profile_image=user.profile_image,
		specialization=user.specialization,
		license_number=user.license_number
	)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user

def get_user_admin(db: Session, user_id):
	return db.query(User).filter(User.id == user_id).first()

def update_user_admin(db: Session, user_id, user: UserEdit):
	db_user = db.query(User).filter(User.id == user_id).first()
	if not db_user:
		return None
	for field, value in user.dict(exclude_unset=True).items():
		setattr(db_user, field, value)
	db.commit()
	db.refresh(db_user)
	return db_user

def delete_user_admin(db: Session, user_id):
	db_user = db.query(User).filter(User.id == user_id).first()
	if not db_user:
		return None
	db.delete(db_user)
	db.commit()
	return db_user

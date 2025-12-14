
from sqlalchemy.orm import Session
from src.Models.usermodel import User, UserRole
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Utils.passwordHasher import hash_password
from uuid import uuid4

def create_user_patient(db: Session, user: UserRegister):
	db_user = User(
		id=uuid4(),
		name=user.name,
		email=user.email,
		phone=user.phone,
		address=user.address,
		password=hash_password(user.password),
		role=UserRole.PATIENT,
		profile_image=user.profile_image
	)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user

def get_user_patient(db: Session, user_id):
	return db.query(User).filter(User.id == user_id, User.role == UserRole.PATIENT).first()

def update_user_patient(db: Session, user_id, user: UserEdit):
	db_user = db.query(User).filter(User.id == user_id, User.role == UserRole.PATIENT).first()
	if not db_user:
		return None
	for field, value in user.dict(exclude_unset=True).items():
		setattr(db_user, field, value)
	db.commit()
	db.refresh(db_user)
	return db_user

def delete_user_patient(db: Session, user_id):
	db_user = db.query(User).filter(User.id == user_id, User.role == UserRole.PATIENT).first()
	if not db_user:
		return None
	db.delete(db_user)
	db.commit()
	return db_user

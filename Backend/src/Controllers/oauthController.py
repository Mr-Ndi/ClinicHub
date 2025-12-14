from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserOAuthRegister
from src.Services.oauthservices import oauth_account_link_or_create

def oauth_login_controller(db: Session, oauth_data: UserOAuthRegister, provider: str, provider_id: str):
    user = oauth_account_link_or_create(db, oauth_data, provider, provider_id)
    if not user:
        raise HTTPException(status_code=400, detail="OAuth login failed")
    return user

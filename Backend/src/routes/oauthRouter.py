from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserOAuthRegister
from src.Controllers.oauthController import oauth_login_controller
from src.Utils.db import get_db

oauthRouter = APIRouter(prefix="/api/oauth", tags=["OAuth"])

@oauthRouter.post("/oauth-login", status_code=status.HTTP_200_OK)
def oauth_login(
    oauth_data: UserOAuthRegister = Body(...),
    provider: str = Body(...),
    provider_id: str = Body(...),
    db: Session = Depends(get_db)
):
    user = oauth_login_controller(db, oauth_data, provider, provider_id)
    return {"message": "OAuth login successful", "user_id": str(user.id), "email": user.email}

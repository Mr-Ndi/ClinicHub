from sqlalchemy.orm import Session
from src.Models.usermodel import User
from src.Middlewares.userpydanticmodel import UserOAuthRegister
from uuid import uuid4

def oauth_account_link_or_create(db: Session, oauth_data: UserOAuthRegister, provider: str, provider_id: str):
    """
    Link an OAuth account to an existing user by email, or create a new user if not found.
    Args:
        db: SQLAlchemy session
        oauth_data: UserOAuthRegister (email, name, profile_image, role)
        provider: OAuth provider name (e.g., 'google')
        provider_id: Unique user id from provider
    Returns:
        User instance
    """
    user = db.query(User).filter(User.email == oauth_data.email).first()
    if user:
        # Update with OAuth info if not already linked
        if not user.oauth_provider or not user.oauth_provider_id:
            user.oauth_provider = provider
            user.oauth_provider_id = provider_id
            if oauth_data.name:
                user.name = oauth_data.name
            if oauth_data.profile_image:
                user.profile_image = oauth_data.profile_image
            if oauth_data.role:
                user.role = oauth_data.role
            db.commit()
            db.refresh(user)
        return user
    # Create new user with OAuth info
    new_user = User(
        id=uuid4(),
        email=oauth_data.email,
        name=oauth_data.name,
        profile_image=oauth_data.profile_image,
        role=oauth_data.role,
        oauth_provider=provider,
        oauth_provider_id=provider_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

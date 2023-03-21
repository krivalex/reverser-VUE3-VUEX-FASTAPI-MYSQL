
from datetime import datetime, timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from class_def import Token,TokenData,User,UserInDB
# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e2k5k4"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 10


fake_users_db = {
    "admin": {
        "username": "admin",
        "full_name": "admin admin",
        "email": "admin@gmail.com",
        "hashed_password": "$2b$12$EixZaLSD1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjLGga42sK",
        "disabled": False,
    }
}




pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# здесь на месте докена нужен поинт откуда с фронта будет прилетать токен

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        #здесь нужно разобраться со схемами, возможна замена
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
            #raise HTTPException(status_code=401, detail="Unauthorized")
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user



@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)]
):
    return current_user


@app.get("places{item_id}")
async def read_own_item(
    item_id: str,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    # TODO: Retrieve the item information from the database based on item_id.
    # This will depend on how your application is structured and how you store item data.

    # For example, if you have a database table called "items" with columns "id", "name", and "description",
    # you could retrieve the item information like this:
    item_info = await db.query("SELECT * FROM items WHERE id = ?", (item_id,))
    if not item_info:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Build a dictionary containing the item information and owner information.
    # You can customize this to match your data model and the information you want to return.
    item_data = {
        "item_id": item_info["id"],
        "name": item_info["name"],
        "description": item_info["description"],
    }

    # Return the item information in the response.
    return item_data
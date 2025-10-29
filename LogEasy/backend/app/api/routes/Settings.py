# backend/routes/settings.py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# 🧠 Data model for user settings
class UserSettings(BaseModel):
    refresh_interval: int = 10   # seconds
    theme: str = "light"         # light or dark
    notifications: bool = True   # enable/disable notifications
    auto_generate_reports: bool = False

# Simulated current settings (you can later store in DB or JSON)
CURRENT_SETTINGS = UserSettings()

# ✅ 1️⃣ GET /settings – fetch current settings
@router.get("/")
async def get_settings():
    return CURRENT_SETTINGS

# ✅ 2️⃣ PUT /settings/update – update settings
@router.put("/update")
async def update_settings(new_settings: UserSettings):
    global CURRENT_SETTINGS
    CURRENT_SETTINGS = new_settings
    return {"message": "Settings updated successfully", "updated_settings": CURRENT_SETTINGS}

# ✅ 3️⃣ GET /settings/defaults – reset or fetch default values
@router.get("/defaults")
async def get_default_settings():
    return UserSettings()

from fastapi import APIRouter, UploadFile, File
from app.services.fetcher import save_uploaded_log

router = APIRouter()

@router.post("/upload")
async def upload_log(file: UploadFile = File(...)):
    path = await save_uploaded_log(file)
    return {"message": "Log uploaded successfully", "path": path}
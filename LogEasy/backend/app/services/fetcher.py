import os
import aiofiles

async def save_uploaded_log(file):
    upload_dir = "data/sample_logs/"
    os.makedirs(upload_dir, exist_ok=True)
    filepath = os.path.join(upload_dir, file.filename)

    async with aiofiles.open(filepath, "wb") as out_file:
        content = await file.read()
        await out_file.write(content)

    return filepath
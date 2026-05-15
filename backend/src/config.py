import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM:str
    DATABASE_URL: str
    ENDPOINT_URL: str
    BUCKET_NAME:str
    BUCKET_UUID : str
    ACCESS_KEY: str
    SECRET_KEY_S3: str
    S3_REGION: str
    storage_class: str = "STANDARD"  # Стандартный
    ALLOWED_ORIGINS: str
    # LOCAL_db: str = "sqlite+aiosqlite:///./db.sqlite3"

    @property
    def cors_origins(self) -> list[str]:
        """Возвращает список разрешённых origins"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    @property
    def get_url_s3(self):
        return f"https://{self.BUCKET_UUID}.s3.ru-7.storage.selcloud.ru"


    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
    )


setting = Settings()
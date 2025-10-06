"""
Main FastAPI application entry point with logging and middleware configuration.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger
import sys

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.api import api_router

# Template & static setup
templates = Jinja2Templates(directory="app/templates")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    setup_logging()
    logger.info("🚀 Job Application System starting up...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug mode: {settings.DEBUG}")
    
    # Initialize database
    try:
        from app.database.init_db import check_db_connection, init_db
        
        if check_db_connection():
            init_db()
            logger.info("✅ Database initialized successfully")
        else:
            logger.warning("⚠️  Database connection failed - some features may not work")
    except Exception as e:
        logger.error(f"❌ Database initialization error: {e}")
    
    yield
    
    # Shutdown
    logger.info("📴 Job Application System shutting down...")


def create_application() -> FastAPI:
    """Create and configure FastAPI application."""
    
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description="AI-powered automated job application system",
        version="1.0.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan
    )

    # Set up CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Mount static files
    app.mount("/static", StaticFiles(directory="app/static"), name="static")

    return app


# Create the FastAPI app instance
app = create_application()


@app.get("/", response_class=HTMLResponse)
async def landing_page(request: Request):
    """Serve the landing page HTML."""
    return templates.TemplateResponse(
        "landing.html",
        {
            "request": request,
            "project_name": settings.PROJECT_NAME,
            "environment": settings.ENVIRONMENT,
            "version": "1.0.0",
        }
    )

@app.get("/api")
async def api_root():
    """JSON root information (moved from /)."""
    return JSONResponse({
        "message": "Job Application System API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "openapi": f"{settings.API_V1_STR}/openapi.json"
    })


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "job-application-system",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    
    logger.info("Starting development server...")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_config=None  # Use loguru instead of uvicorn's logging
    )
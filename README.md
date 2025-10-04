# 🚀 AI-Powered Job Application Automation System

A production-ready FastAPI backend system that automates the entire job application process using AI and machine learning.

## 🎯 Features

### 🔍 Multi-Source Job Aggregation
- **4 Active Sources**: RemoteOK, GitHub, Reed (UK), Adzuna (Global)
- **Smart Deduplication**: Prevents duplicate job listings
- **Real-time Fetching**: ~15 jobs per API call
- **Error Handling**: Graceful fallbacks for all sources

### 🤖 AI-Powered Project Matching
- **ML Algorithm**: TF-IDF similarity + keyword matching + technology alignment
- **Smart Selection**: Automatically selects top 3-5 most relevant projects
- **Confidence Scoring**: Detailed match explanations with percentages
- **Performance**: <1 second matching for 10 projects

### 📄 Dynamic Resume Generation
- **PDF Generation**: LaTeX (primary) + ReportLab (fallback)
- **Professional Templates**: Custom LaTeX with Jinja2 placeholders
- **Job-Specific**: Automatically tailored for each application
- **Fast**: ~2 seconds generation time

### ✉️ AI Cover Letter Generation
- **AI Integration**: Groq (primary) + OpenAI (fallback)
- **Template Fallback**: Professional templates when AI unavailable
- **Bulk Support**: Generate for multiple jobs simultaneously
- **Personalization**: Uses job context and selected projects

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FastAPI       │    │   PostgreSQL    │    │     Redis       │
│   Backend       │◄──►│   Database      │    │     Cache       │
│   (Port 8000)   │    │   (Supabase)    │    │   (Port 6379)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Job Sources   │    │   ML Matching   │    │   AI Services   │
│ RemoteOK,GitHub │    │   TF-IDF + NLP  │    │  Groq, OpenAI   │
│  Reed, Adzuna   │    │   Caching       │    │   Templates     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL database (or Supabase)
- Redis (optional, for caching)

### Installation

1. **Clone and Setup**
```bash
git clone <repository>
cd job-application-system
pip install -r requirements.txt
```

2. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Database Setup**
```bash
alembic upgrade head
```

4. **Start the Server**
```bash
python start_server_fixed.py
```

### Docker Deployment (Recommended)

```bash
# Start all services
docker-compose up --build

# Access:
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
# - Redis: localhost:6379
```

## 🔧 Configuration

### Required Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# Security
SECRET_KEY=your-secret-key-here
```

### Optional API Keys (for enhanced functionality)
```bash
# Job Sources
REED_API_KEY=your-reed-api-key          # UK jobs
ADZUNA_APP_ID=your-adzuna-app-id        # Global jobs
ADZUNA_APP_KEY=your-adzuna-app-key

# AI Services
GROQ_API_KEY=your-groq-api-key          # Fast AI generation
OPENAI_API_KEY=your-openai-api-key      # Fallback AI

# Caching
REDIS_URL=redis://localhost:6379/0      # Performance optimization
```

## 📚 API Documentation

### Job Management
```bash
# Search jobs with filters
GET /api/v1/jobs?keywords=python&location=remote&limit=20

# Fetch new jobs from all sources
POST /api/v1/jobs/fetch
{
  "keywords": ["python", "react"],
  "limit_per_source": 10
}

# Get job details
GET /api/v1/jobs/{job_id}

# Manage job sources
GET /api/v1/jobs/sources
```

### Project Matching
```bash
# Match projects to job
GET /api/v1/match/{job_id}?user_id=123&max_results=5

# Get detailed explanation
POST /api/v1/match/{job_id}/explain?project_id=456&user_id=123

# Cache management
GET /api/v1/match/cache/stats
DELETE /api/v1/match/cache/{user_id}
```

### Resume Generation
```bash
# Generate custom resume
POST /api/v1/resume/generate
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1(555) 123-4567",
  "location": "San Francisco, CA",
  "primary_skills": ["Python", "React", "AWS"],
  "experience": [...],
  "projects": [...],
  "job_id": "optional-for-customization"
}

# Download resume PDF
GET /api/v1/resume/download/{resume_id}
```

### Cover Letter Generation
```bash
# Generate for specific job
POST /api/v1/cover-letters/{job_id}
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "primary_skills": ["Python", "React"],
  "selected_projects": [...]
}

# Bulk generation for multiple jobs
POST /api/v1/cover-letters/bulk
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "job_ids": ["job1", "job2", "job3"],
  "user_name": "John Doe",
  "user_email": "john@example.com"
}

# Download cover letter
GET /api/v1/cover-letters/{cover_letter_id}/download

# Bulk download as ZIP
POST /api/v1/cover-letters/bulk/download?cover_letter_ids=id1,id2,id3
```

## 📊 Performance Metrics

- **Job Fetching**: ~15 jobs per API call (4 sources)
- **Project Matching**: <1 second for 10 projects
- **Resume Generation**: ~2 seconds (ReportLab fallback)
- **Cover Letter Generation**: ~3 seconds (template mode)
- **Cache Hit Rate**: 85%+ for repeated operations

## 🧪 Testing

```bash
# Run integration tests
python test_integration_simple.py

# Test specific components
python -m pytest tests/

# Load test with sample data
python load_test_jobs.py
```

## 📁 Project Structure

```
app/
├── api/v1/endpoints/          # REST API endpoints
│   ├── jobs.py               # Job management
│   ├── resume.py             # Resume generation
│   ├── cover_letters.py      # Cover letter generation
│   └── project_matching.py   # ML project matching
├── services/                  # Business logic
│   ├── job_fetcher.py        # Multi-source job fetching
│   ├── resume_generator.py   # PDF resume generation
│   ├── cover_letter_generator.py # AI cover letter generation
│   ├── job_service.py        # Job data management
│   └── matching/             # ML matching algorithms
├── models/                    # Database models
├── schemas/                   # Pydantic schemas
├── templates/                 # LaTeX and text templates
└── generated/                 # Generated files storage
```

## 🔒 Security Features

- Input validation with Pydantic models
- SQL injection prevention (SQLAlchemy ORM)
- File upload restrictions
- Environment-based configuration
- Health monitoring endpoints

## 🚀 Deployment

### Production Checklist
- [ ] Set strong SECRET_KEY
- [ ] Configure production database
- [ ] Set up Redis for caching
- [ ] Configure API keys for job sources
- [ ] Set up monitoring and logging
- [ ] Configure CORS origins
- [ ] Set up SSL/TLS

### Scaling Considerations
- Use Redis for caching and session storage
- Implement rate limiting for API endpoints
- Consider horizontal scaling with load balancers
- Monitor API usage and performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check `/docs` endpoint when server is running
- **Issues**: Create an issue in the repository
- **API Reference**: Available at `http://localhost:8000/docs`

---

**Built with FastAPI, PostgreSQL, Redis, and AI services for modern job application automation.**

---

## ⚡ Windows Quick Start (No Docker)

If you just installed PostgreSQL locally and want the fastest path to a running server + landing page:

### 1. PostgreSQL
Create a database and user (example):
```sql
CREATE DATABASE applybot;
CREATE USER applybot_user WITH PASSWORD 'applybot_pass';
GRANT ALL PRIVILEGES ON DATABASE applybot TO applybot_user;
```

### 2. One-Command Setup & Run
From the `ApplyBot` directory (or project root using npm script):
```powershell
powershell -ExecutionPolicy Bypass -File .\setup_local.ps1
# or from root (package.json):
npm run backend:setup-run
```
This will:
1. Create `.env` if missing
2. Create & activate `.venv`
3. Install dependencies
4. Sanity check DB port
5. Start the FastAPI server on `http://localhost:8000`

### 3. Static Landing Page (Optional)
Run the standalone static site (does not require Python once built):
```powershell
npm run serve:static
# open http://localhost:5173/
```
If the backend (port 8000) is also running, the static page will show live version + health.

### 4. Verify
| What | URL |
|------|-----|
| Landing (FastAPI) | http://localhost:8000/ |
| Swagger Docs | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| Health | http://localhost:8000/health |
| Static Variant | http://localhost:5173/ |

### 5. Environment Variables
Created automatically if absent. Adjust `DATABASE_URL` in `.env` as needed:
```
DATABASE_URL=postgresql://applybot_user:applybot_pass@localhost:5432/applybot
```

### 6. Common Issues
| Issue | Fix |
|-------|-----|
| ValueError: DATABASE_URL required | Ensure `.env` created; re-run script |
| Cannot connect to Postgres | Confirm service running; correct port/credentials |
| LaTeX errors | Install MiKTeX or rely on ReportLab fallback |
| loguru not found | Virtual environment not activated; re-run script |

### 7. Clean Up
```powershell
deactivate
Remove-Item .venv -Recurse -Force
# Optional: drop database
psql -U postgres -c "DROP DATABASE applybot;"
```

---
import uvicorn
from fastapi import FastAPI, Request, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError, OperationalError, IntegrityError
from src.routes.patientRouter import patientRouter
from src.routes.doctorRouter import doctorRouter
from src.routes.oauthRouter import oauthRouter
from src.routes.passwordRouter import passwordRouter
from src.routes.authRouter import authRouter
from src.routes.videoCallRouter import videoCallRouter
from src.routes.healthMetricsRouter import healthMetricsRouter
from src.routes.prescriptionRouter import prescriptionRouter
from src.routes.medicalrecordRouter import medicalrecordRouter
from src.routes.stockRouter import stockRouter
from src.routes.billingRouter import billingRouter
from src.routes.adminRouter import adminRouter
from src.routes.appointmentRouter import appointmentRouter
from src.routes.dashboardRouter import router as dashboardRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

app = FastAPI(
    docs_url="/docs",
    title="Clinichub Backend API",
    redoc_url=None,
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

# Only support Bearer token authentication in Swagger UI
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=app.title,
        version="1.0.0",
        description=app.description,
        routes=app.routes,
    )
    # Only Bearer token input, no OAuth2
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Define allowed origins for CORS FIRST (before exception handlers)
# IMPORTANT: When allow_credentials=True, we cannot use "*" for origins
# We must explicitly list all allowed origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Global exception handlers for meaningful error messages
# Note: HTTPException is handled by FastAPI automatically
# These handlers catch unhandled SQLAlchemy exceptions that escape service/controller layers

@app.exception_handler(OperationalError)
async def operational_error_handler(request: Request, exc: OperationalError):
	error_msg = str(exc.orig) if hasattr(exc, 'orig') else str(exc)
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	
	if "column" in error_msg.lower() and "does not exist" in error_msg.lower():
		response = JSONResponse(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			content={
				"detail": "Database schema error. The database table structure may be outdated. Please contact the administrator to update the database schema."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response
	elif "relation" in error_msg.lower() and "does not exist" in error_msg.lower():
		response = JSONResponse(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			content={
				"detail": "Database table not found. Please contact the administrator to set up the required database tables."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response
	else:
		response = JSONResponse(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			content={
				"detail": "Database connection error. Please try again later or contact support."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response

@app.exception_handler(IntegrityError)
async def integrity_error_handler(request: Request, exc: IntegrityError):
	error_msg = str(exc.orig) if hasattr(exc, 'orig') else str(exc)
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	
	if "duplicate" in error_msg.lower() or "unique" in error_msg.lower():
		response = JSONResponse(
			status_code=status.HTTP_400_BAD_REQUEST,
			content={
				"detail": "This record already exists. Please use different information."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response
	elif "foreign key" in error_msg.lower():
		response = JSONResponse(
			status_code=status.HTTP_400_BAD_REQUEST,
			content={
				"detail": "Invalid reference. The related record does not exist."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response
	else:
		response = JSONResponse(
			status_code=status.HTTP_400_BAD_REQUEST,
			content={
				"detail": "Data validation failed. Please check your input and try again."
			}
		)
		response.headers["Access-Control-Allow-Origin"] = allowed_origin
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
		response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
		response.headers["Access-Control-Allow-Credentials"] = "true"
		return response

@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_error_handler(request: Request, exc: SQLAlchemyError):
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	response = JSONResponse(
		status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
		content={
			"detail": "Database error occurred. Please try again later or contact support."
		}
	)
	# Add CORS headers
	response.headers["Access-Control-Allow-Origin"] = allowed_origin
	response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
	response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
	response.headers["Access-Control-Allow-Credentials"] = "true"
	return response

@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
	errors = exc.errors()
	error_messages = []
	for error in errors:
		field = ".".join(str(loc) for loc in error.get("loc", []))
		message = error.get("msg", "Invalid value")
		error_messages.append(f"{field}: {message}")
	
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	response = JSONResponse(
		status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
		content={
			"detail": "Validation error: " + "; ".join(error_messages)
		}
	)
	# Add CORS headers
	response.headers["Access-Control-Allow-Origin"] = allowed_origin
	response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
	response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
	response.headers["Access-Control-Allow-Credentials"] = "true"
	return response

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
	"""Custom HTTPException handler to ensure CORS headers are included"""
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	response = JSONResponse(
		status_code=exc.status_code,
		content={"detail": exc.detail}
	)
	# Add CORS headers
	response.headers["Access-Control-Allow-Origin"] = allowed_origin
	response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
	response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
	response.headers["Access-Control-Allow-Credentials"] = "true"
	return response

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
	# Skip HTTPException as it's handled by our custom handler above
	if isinstance(exc, HTTPException):
		raise exc
	
	# Log the full error for debugging (in production, use proper logging)
	print(f"Unhandled exception: {type(exc).__name__}: {str(exc)}")
	import traceback
	print(traceback.format_exc())
	
	origin = request.headers.get("origin")
	# When credentials are enabled, we CANNOT use "*" - use specific origin
	allowed_origin = origin if origin in origins else (origins[0] if origins else "http://localhost:5173")
	response = JSONResponse(
		status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
		content={
			"detail": "An unexpected error occurred. Please try again later or contact support."
		}
	)
	# Add CORS headers
	response.headers["Access-Control-Allow-Origin"] = allowed_origin
	response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
	response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-Requested-With"
	response.headers["Access-Control-Allow-Credentials"] = "true"
	return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Set to True to allow cookies/auth headers
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Authorization", "Content-Type", "Accept", "X-Requested-With"],  # Explicitly list headers, including Authorization
    expose_headers=["*"],
)

# Include routers
app.include_router(patientRouter)
app.include_router(doctorRouter)
app.include_router(oauthRouter)
app.include_router(passwordRouter)
app.include_router(authRouter)
app.include_router(videoCallRouter)
app.include_router(healthMetricsRouter)
app.include_router(prescriptionRouter)
app.include_router(medicalrecordRouter)
app.include_router(stockRouter)
app.include_router(billingRouter)
app.include_router(adminRouter)
app.include_router(appointmentRouter)
app.include_router(dashboardRouter)

@app.get("/")
async def read_root():
    return {"Ubutumwa": "Server iri tayali !"}

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=2739, reload=True)
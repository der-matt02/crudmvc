from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

# Conexion de base de datos SQLITE
DATABASE_URL = "sqlite:///./test.db"  # Base de datos en un archivo local

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # Para usar SQLite

# Crear el SessionLocal que se usará para crear sesiones con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Inicializar metadata
meta = MetaData()

# Establecer la conexión a bd
connection_db = engine.connect()

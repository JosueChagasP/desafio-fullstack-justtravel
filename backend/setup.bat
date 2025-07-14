@echo off
echo TASK GAME - SETUP BACKEND
echo ========================

echo Verificando Python...
python --version
if %errorlevel% neq 0 (
    echo ERRO: Python nao encontrado!
    pause
    exit /b 1
)

echo Criando ambiente virtual...
python -m venv venv

echo Ativando ambiente virtual...
call venv\Scripts\activate.bat

echo Instalando dependencias...
pip install Flask==2.3.3
pip install Flask-SQLAlchemy==3.0.5
pip install Flask-CORS==4.0.0
pip install Werkzeug==2.3.7
pip install SQLAlchemy==2.0.21
pip install python-dotenv==1.0.0

echo Criando arquivo .env...
echo FLASK_APP=app.py > .env
echo FLASK_ENV=development >> .env
echo SECRET_KEY=just-travel-secret-2024 >> .env

echo Criando script de execucao...
echo @echo off > run.bat
echo call venv\Scripts\activate.bat >> run.bat
echo python app.py >> run.bat
echo pause >> run.bat

echo.
echo SETUP CONCLUIDO!
echo Execute: run.bat
pause
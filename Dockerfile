FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=postgres://cqkejfxftzwfmd:6a0e12f10af480d1c8f93d8a948049be791299a7fe7f15bb423c5fe1c831335e@ec2-54-237-135-248.compute-1.amazonaws.com:5432/da3g29d8lqh842

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.8

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install requests

# Run flask environment
CMD gunicorn app:app

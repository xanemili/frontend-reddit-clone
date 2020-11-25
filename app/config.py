import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = True
    S3_KEY = os.environ.get('aws_access_key_id')
    S3_SECRET = os.environ.get('aws_secret_access_key')
    S3_BUCKET = os.environ.get('aws_bucket_name')
    S3_LOCATION = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

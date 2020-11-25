from flask import Blueprint, request
from werkzeug.utils import secure_filename
from app.helpers import *
from app.config import Config

s3_routes = Blueprint('s3', __name__)


@s3_routes.route('/upload', methods=['POST'])
def upload_file():
    # request.file does not have the correct keys avaliable to it
    # This is most likely due to the way the data is being passed in through the frontend
    # As these other methods require that the post is being sent directly from the form itself
    # However request.files does contain a file with the appropriate name, but stored in an ImmutableMultiDict
    # print("method", request.method)
    print("request,", request.files)
    # if "user_file" not in request.files:
    #     return print("No user_file key in request.files"), 400

    file = request.files
    print('fileHere', file)
    """
        These attributes are also available

        file.filename               # The actual name of the file
        file.content_type
        file.content_length
        file.mimetype

    """
    if file.filename == "":
        return print("please select a file"), 400

    if file and allowed_file(file.filename):
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(file, Config.S3_BUCKET)
        return str(output)

    else:
        return print("something wrong"), 400


def upload_file_to_s3(file, bucket_name, acl="public-read"):

    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        print("Something Happened: ", e)
        return e, 400

    return "{}{}".format(Config.S3_LOCATION, file.filename)

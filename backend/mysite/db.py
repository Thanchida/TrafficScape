import pymysql
from dbutils.pooled_db import PooledDB
from django.conf import settings


pool = PooledDB(creator=pymysql,
                host=settings.DB_HOST,
                user=settings.DB_USER,
                password=settings.DB_PASSWD,
                database=settings.DB_NAME,
                maxconnections=5,
                blocking=True,)
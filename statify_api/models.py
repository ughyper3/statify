from datetime import datetime
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models
import uuid as uuid_util


class CustomManager(models.Manager):
    pass


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid_util.uuid4)
    created_at = models.DateTimeField(default=datetime.now)
    deleted = models.BooleanField(default=False)
    objects = CustomManager()

    class Meta:
        abstract = True

    abstract = True

    def delete(self, **kwargs):
        self.deleted = True
        self.save()


class Song(BaseModel):
    name = models.CharField(max_length=100, null=False, blank=False)
    artist = models.CharField(max_length=100, null=False, blank=False)
    played_at = models.DateTimeField(null=False, blank=False)

    def __str__(self):
        return self.name + '-' + self.artist

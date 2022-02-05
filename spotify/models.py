from django.db import models
from statify_api.models import BaseModel


class SpotifyToken(BaseModel):
    user = models.CharField(max_length=50, unique=True)
    refresh_token = models.CharField(max_length=500, null=True)
    access_token = models.CharField(max_length=500)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
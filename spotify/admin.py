from django.contrib import admin
from .models import SpotifyToken


class SpotifyTokenAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'refresh_token', 'access_token', 'expires_in', 'token_type'
    ]


admin.site.register(SpotifyToken, SpotifyTokenAdmin)
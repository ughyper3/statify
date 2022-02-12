from django.contrib import admin
from statify_api.models import Song, Profile


class SongAdmin(admin.ModelAdmin):
    list_display = [
        "name", "artist", "played_at"
    ]

class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        "country", "display_name", "spotify_account"
    ]



admin.site.register(Song, SongAdmin)
admin.site.register(Profile, ProfileAdmin)

from django.contrib import admin
from statify_api.models import Song


class SongAdmin(admin.ModelAdmin):
    list_display = [
        "name", "artist", "played_at"
    ]


admin.site.register(Song, SongAdmin)

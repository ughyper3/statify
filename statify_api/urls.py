from django.urls import path
from statify_api.views import SongAPIView

urlpatterns = [
    path('song/', SongAPIView.as_view())
]
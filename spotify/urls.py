from django.urls import path
from .views import AuthURL, spotify_callback, IsAuthenticated, RecentListenedSongs, UserProfile, Playlist, \
    CurrentlyPlayed

urlpatterns = [
    path('get-auth-url/', AuthURL.as_view()),
    path('redirect/', spotify_callback),
    path('is-authenticated/', IsAuthenticated.as_view()),
    path('recently-played-songs/', RecentListenedSongs.as_view()),
    path('profile/', UserProfile.as_view()),
    path('playlist/', Playlist.as_view()),
    path('currently-played/', CurrentlyPlayed.as_view())
]
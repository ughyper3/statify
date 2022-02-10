import datetime

from django.shortcuts import redirect

from statify_api.models import Song
from .utils import update_or_create_user_tokens, is_spotify_authenticated, execute_spotify_api_request, \
    get_percentage_of_progression, date_parse
from rest_framework import status
from rest_framework.response import Response
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post


class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-recently-played user-read-private playlist-read-private user-read-currently-playing'
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:home')


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class RecentListenedSongs(APIView):
    def get(self, request, format=None):
        endpoint = "/player/recently-played/"
        response = execute_spotify_api_request(session_id=self.request.session.session_key, endpoint=endpoint)

        if 'error' in response or 'items' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        songs_list = []

        for song in response['items']:
            songs_list.append({
                'song_name': song['track']['name'],
                'artist': song['track']['album']['artists'][0]['name'],
                'played_at': song['played_at'],
                'image': song['track']['album']['images'][0]['url'],
                'format_date': date_parse(song['played_at'])
            })

        for song in songs_list:
            if not Song.objects.filter(name=song['song_name'], artist=song['artist'], played_at=song['played_at']).exists():
                insert_song = Song(name=song['song_name'], artist=song['artist'], played_at=song['played_at'])
                insert_song.save()

        return Response(songs_list[:10], status=status.HTTP_200_OK)


class UserProfile(APIView):
    def get(self, request, format=None):
        endpoint = ''
        response = execute_spotify_api_request(session_id=self.request.session.session_key, endpoint=endpoint)

        if 'error' in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        profile = {
            'country': response['country'],
            'display_name': response['display_name'],
            'spotify_account': response['external_urls']['spotify'],
            'followers': response['followers']['total'],
            'image': response['images'][0]['url']
        }

        return Response(profile, status=status.HTTP_200_OK)


class Playlist(APIView):
    def get(self, request, format=None):
        endpoint = '/playlists'
        response = execute_spotify_api_request(session_id=self.request.session.session_key, endpoint=endpoint)

        if 'error' in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        playlists = []

        for playlist in response['items']:
            playlists.append({
                'name': playlist['name'],
                'image': playlist['images'][0]['url'],
                'link': playlist['external_urls']['spotify']
            })

        return Response(playlists, status=status.HTTP_200_OK)


class CurrentlyPlayed(APIView):
    def get(self, request, format=None):
        endpoint = '/player/currently-playing'
        response = execute_spotify_api_request(session_id=self.request.session.session_key, endpoint=endpoint)

        if 'error' in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        current_song = {
            'progress_ms': response['progress_ms'],
            'song_name': response['item']['name'],
            'artist_name': response['item']['album']['artists'][0]['name'],
            'image': response['item']['album']['images'][0]['url'],
            'duration_ms': response['item']['duration_ms']
        }
        current_song['percentage'] = get_percentage_of_progression(current_song['duration_ms'], current_song['progress_ms'])

        return Response(current_song, status=status.HTTP_200_OK)
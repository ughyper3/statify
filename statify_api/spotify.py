import datetime
import requests
import pandas as pd


class Spotify:

    today = datetime.datetime.now()
    yesterday = today - datetime.timedelta(days=1)
    yesterday_unix_timestamp = int(yesterday.timestamp()) * 1000

    token = 'BQCpX1lRpniU5VZYyLcrnSGqy4yDkNXKdqzhEicyBSoiIBHdsZQvKhi8Qy0e58IjDqRAJLfSJxJb8j8EWdyR3Lhr_gWVmD4JW46ukvXOM60peOuQbvy-Qjnv-FYZvvwd2M4A84-5F2mEztSchA'
    song_header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer {token}".format(token=token)
    }
    song_request = requests.get("https://api.spotify.com/v1/me/player/recently-played?after={time}"
                                .format(time=yesterday_unix_timestamp), headers=song_header)
    song_response = song_request.json()

    @staticmethod
    def check_if_valid_data(df: pd.DataFrame) -> bool:
        if df.empty:
            print("No songs downloaded.")
            return False

        if not pd.Series(df['played_at']).is_unique:
            raise Exception("primary key check is violated in df")

        if df.isnull().values.any():
            raise Exception("Null value in df")

        else:
            return True

    @staticmethod
    def format_response(response):

        song_names = []
        artist_names = []
        played_at_list = []

        for song in response['items']:
            song_names.append(song['track']['name'])
            artist_names.append(song['track']['album']['artists'][0]['name'])
            played_at_list.append(song['played_at'])

        song_dict = {
            "song_name": song_names,
            "artist_names": artist_names,
            "played_at": played_at_list,
        }

        song_df = pd.DataFrame(song_dict, columns=["song_name", "artist_names", "played_at"])

        return song_df


spotify = Spotify()

df = spotify.format_data(spotify.song_response)
print(df)
if not spotify.check_if_valid_data(df):
    print('error')
else:
    print(df)



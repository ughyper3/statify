from rest_framework.serializers import ModelSerializer
from statify_api.models import Song


class SongSerializer(ModelSerializer):

    class Meta:
        model = Song
        fields = ['name', 'artist', 'played_at']



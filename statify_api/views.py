from rest_framework.views import APIView
from rest_framework.response import Response
from statify_api.serializers import SongSerializer
from statify_api.models import Song


class SongAPIView(APIView):

    def get(self, *args, **kwargs):
        song = Song.objects.all()
        serializer = SongSerializer(song, many=True)
        return Response(serializer.data)


from rest_framework.response import Response
from rest_framework.decorators import api_view
from yt_app.services.yt_downloader_best import download_best_quality
from yt_app.services.database import add_entry, get_entries

@api_view(["POST"])
def process_single(request):
    text = request.data.get("text", "Нет данных")
    add_entry(text)
    download_best_quality(text)
    response_text = f"Загрузка завершена: {text}"
    return Response({"response": response_text})
    
    
@api_view(["GET"])
def get_history(request):
    history = get_entries()
    return Response({"history": history})

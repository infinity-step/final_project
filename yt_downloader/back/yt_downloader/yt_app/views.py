from rest_framework.response import Response
from rest_framework.decorators import api_view
from yt_app.services.yt_downloader import download_and_merge, list_formats
from yt_app.services.database import add_entry, get_entries

url = ''

@api_view(["POST"])
def process_single(request):
    text = request.data.get("text", "Нет данных")
    url = text
    add_entry(text)
    resp = list_formats(text)
    response_text = f"Доступные форматы: {resp}"
    return Response({"response": response_text})
    
@api_view(["POST"])
def process_double(request):
    first = request.data.get("first", "Нет данных")
    second = request.data.get("second", "Нет данных")
    download_and_merge(url, first, second)
    response_text = f"Загрузка завершена: {url}"
    return Response({"response": response_text})
    
    
@api_view(["GET"])
def get_history(request):
    history = get_entries()
    return Response({"history": history})

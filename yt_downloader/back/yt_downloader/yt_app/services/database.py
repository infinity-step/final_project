from yt_app.models import YtModel
from datetime import datetime

def add_entry(url):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    new_entry = YtModel.objects.create(field1=url, field2=now)

def get_entries():
    list_info = []
    all_entries = YtModel.objects.all()
    for entry in all_entries:
        record = f'URL видео: {entry.field1} Время загрузки: {entry.field2}'
        list_info.append(record)
    list_info.reverse()
    return list_info
        

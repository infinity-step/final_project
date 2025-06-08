import yt_dlp

def download_best_quality(url):
    ydl_opts = {
        'format': 'bv+ba/best',
        'merge_output_format': 'mp4',
        'outtmpl': '%(title)s.%(ext)s'
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


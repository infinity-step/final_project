import yt_dlp

def list_formats(url):
    ydl_opts = {'listformats': True}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.extract_info(url, download=False)

def download_and_merge(url, video_format, audio_format):
    ydl_opts = {
        'format': f'{video_format}+{audio_format}',
        'merge_output_format': 'mp4',
        'outtmpl': 'media/%(title)s.%(ext)s'
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

import unittest
from yt_app.services.yt_downloader import list_formats
from yt_dlp import DownloadError

class TestYt(unittest.TestCase):
    def test_list_formats(self):
        with self.assertRaises(DownloadError):
            list_formats("https://example.com/video/123")
        self.assertEqual(type(list_formats('https://www.youtube.com/shorts/YJpznYgZlKM')), str)


#!/c/Users/chris/.windows-build-tools/python27/python
import os, os.path
import cherrypy

class Root(object):
    @cherrypy.expose
    def index(self):
        return """<html lang="en">
                  <head><h1>Video Call</h1></head>
                  <body></body>
                  <script crossorigin src="https://unpkg.com/@daily-co/daily-js"></script>
                  <script>
                  callFrame = window.DailyIframe.createFrame();
                  callFrame.join({ url: 'https://friendover.daily.co/hello' })
                  </script>
                  </html>"""

def start_service():
    cherrypy.quickstart(Root(), '/',
        {
            '/':
            {
                'tools.sessions.on': True,
                'tools.staticdir.root': os.path.abspath(os.getcwd())
            },
            '/static':
            {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': '',
                'tools.staticdir.index': 'index.html'
            },
            '/favicon.ico':
            {
                'tools.staticfile.on': True,
                'tools.staticfile.filename': '%smyfavicon.ico.PNG' % os.path.abspath(os.getcwd())
            }
        })

class optionsController:
    def OPTIONS(self, *args, **kwargs):
        ""

def CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS"
    cherrypy.response.headers["Access-Control-Allow-Credentials"] = "true"

if __name__ == '__main__':
    cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS)
    start_service()

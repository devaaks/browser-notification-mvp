from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('ui', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files from the ui directory"""
    return send_from_directory('ui', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

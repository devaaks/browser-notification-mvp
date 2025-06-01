from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/script.js')
def script_js():
    return send_from_directory('.', 'script.js')

@app.route('/icon.png')
def icon_png():
    return send_from_directory('.', 'icon.png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)

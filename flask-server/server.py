from flask import Flask

app = Flask(__name__)


@app.route('/test')
def get_test():
    return {
        "test1": "test2"
    }


if __name__ == "__main__":
    app.run(debug=True)
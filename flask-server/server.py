from flask import Flask
import random

app = Flask(__name__)


@app.route('/test')
def get_test():
    return {
        "test1": str(random.random())
    }


if __name__ == "__main__":
    app.run(debug=True)
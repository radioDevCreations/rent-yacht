from flask import Flask
import random
from dbconnection import getHarbours

app = Flask(__name__)


@app.route('/harbours')
def get_test():
    return getHarbours()


if __name__ == "__main__":
    app.run(debug=True)
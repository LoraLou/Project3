# 1. import Flask
from flask import Flask
import json

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return "Group project 3"



if __name__ == "__main__":
    app.run(debug=True)



@app.route("/")
def home():
    # """List of all available routes"""
    return (
        f"/api/v1.0/precipitation<br/>"
        
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    session = Session(engine) 

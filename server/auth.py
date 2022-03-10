import pyrebase
import json

# firebase configuration
firebaseConfig = {
  "apiKey": "AIzaSyBT8o7p0TU2bt9NLwayz-NxHZplqSXcdqY",
  "authDomain": "healthcare-71821.firebaseapp.com",
  "databaseURL": "https://healthcare-71821-default-rtdb.firebaseio.com",
  "projectId": "healthcare-71821",
  "storageBucket": "healthcare-71821.appspot.com",
  "messagingSenderId": "701685583743",
  "appId": "1:701685583743:web:a7494a5ec8988d4c13944a",
  "measurementId": "G-WWMXHJTL5P"
};

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()
try:
    db = firebase.database()
except Exception as e:
    sys.stderr.write('db init failed {}'.format(e))


def login(email, password):
    try:
        auth.sign_in_with_email_and_password(email,password)
        print("logged in")
    except Exception:
        print("invalid credentials")

def register(mobile, name, email, password):
    data = {
        "mobile": mobile,
        "name": name,
        "email": email,
        "password": password
    }
    try:
        auth.create_user_with_email_and_password(email,password)
        db.child("users").child(mobile).set(data)
    except Exception as e:
        response = e.json()
        print(response)

def checkEmail(parameters):
    pass

def deleteUser(parameters):
    pass

def changePassword(parameters):
    pass

def updateUser(parameters):
    pass

def googleLogin(parameters):
    pass

if __name__ == "__main__":
    print("auth.py")
    
    # check register
    # commented if done
    # register("7891009270", "harsh", "hvtailor16@gmail.com", "password")

    # check login
    # correct
    # login("hvtailor16@gmail.com", "password") # works
    # incorrecct
    # login("hvtailor16@gmail.com", "wrong") # to be update for unsuccessful logins with complete details
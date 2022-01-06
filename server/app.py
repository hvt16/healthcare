from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import redirect
import disease_prediction
import medicine_suggestion
import xray

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def home():
    return 'it is home'

@app.route('/disease_prediction_using_symptoms', methods=['POST'])
@cross_origin()
def disrease_prediction():
    request_sym = request.json.get('syms')['symptoms']
    print(request_sym)
    # list_of_symptoms = ['itching','skin_rash','nodal_skin_eruptions']
    list_of_symptoms = request_sym.split(", ")
    print(list_of_symptoms)
    prediction_result = disease_prediction.predict_disease(list_of_symptoms)
    medicines = medicine_suggestion.suggest_medicine(prediction_result)    
    print(prediction_result, medicines)
    return jsonify(prediction_result + '@' +medicines)

@app.route('/xray_prediction', methods=['POST'])
@cross_origin()
def xray_prediction():
    print(request.files)
    if 'selectedFile' not in request.files:
        print('no file uploaded')
        return jsonify("couldn't read file properly")
    else:
        file = request.files['selectedFile']
        filepath = './static/xray.jpeg'
        file.save(filepath)
        results = xray.predict_xray()
        return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
    # itching, skin_rash, nodal_skin_eruptions
    # headache, vomiting, high_fever, back_pain, joint_pain, nausea, loss_of_appetite, malaise, muscle_pain
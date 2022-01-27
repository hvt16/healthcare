from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import redirect
import disease_prediction
import medicine_suggestion
import xray
import braintumor
import diabities

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
    medicines = medicine_suggestion.suggest_medicine(prediction_result[0])    
    # prediction_result[0] = "Possible Disease : " + prediction_result[0]
    # prediction_result[1] = "Confidence : " + prediction_result[1]
    result = "Possible Disease : " + prediction_result[0] + '@' + "Confidence : " + prediction_result[1] + '@' +medicines
    # print(prediction_result, medicines)
    return jsonify(result)

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

# adding brain tumor part 
@app.route('/brain_tumor_prediction', methods=['POST'])
@cross_origin()
def brain_tumor_prediction():
    print(request.files)
    if 'selectedFile' not in request.files:
        print('no file uploaded')
        return jsonify("couldn't read file properly")
    else:
        file = request.files['selectedFile']
        filepath = './static/bt.jpg'
        file.save(filepath)
        results = braintumor.predict_brain_tumor()
        return jsonify(results)

# diabities prediction
@app.route('/diabities_prediction', methods=['POST'])
@cross_origin()
def diabities_prediction():
    request_diab = request.json.get('syms')
    di = {
        'num_preg' : int(request_diab['1']),
        'glucose_conc' : int(request_diab['2']),
        'diastolic_bp' : int(request_diab['3']),
        'insulin' : int(request_diab['4']),
        'bmi' : float(request_diab['5']),
        'diab_pred' : float(request_diab['6']),
        'age' : int(request_diab['7']),
        'skin' : float(request_diab['8'])
    }
    prediction_result = diabities.predict_diabities(di)
    print(prediction_result)
    if prediction_result is "yes":
        prediction_result = "diabatic"
    else:
        prediction_result = "normal"
    print(prediction_result)
    # print(request_diab)
    return jsonify(prediction_result)

if __name__ == '__main__':
    app.run(debug=True)
    # itching, skin_rash, nodal_skin_eruptions
    # headache, vomiting, high_fever, back_pain, joint_pain, nausea, loss_of_appetite, malaise, muscle_pain
import pickle

def predict_diabities(di_all):
    print(di_all)
    model = pickle.load(open('../models/classifier.pkl','rb'))
    res = model.predict([[di_all['num_preg'], di_all['glucose_conc'], di_all['diastolic_bp'], di_all['insulin'], di_all['bmi'], di_all['diab_pred'], di_all['age'], di_all['skin']]])
    if res[0] == 1:
        return "yes"
    else:
        return "no"

if __name__ == "__main__":
    di = {
        'num_preg' : 6,
        'glucose_conc' : 148,
        'diastolic_bp' : 72,
        'insulin' : 0,
        'bmi' : 33.6,
        'diab_pred' : 0.627,
        'age' : 50,
        'skin' : 1.3790
    }
    print(predict_diabities(di))
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
import pickle
from scipy.stats import mode

# load models
with open("../models/model_svm.pkl", "rb") as file:
    model_svm = pickle.load(file)

with open("../models/model_gnb.pkl", "rb") as file:
    model_gnb = pickle.load(file)
    
with open("../models/model_mnb.pkl", "rb") as file:
    model_mnb = pickle.load(file)
    
with open("../models/model_rfc.pkl", "rb") as file:
    model_rfc = pickle.load(file)
    
with open("../models/model_dtc.pkl", "rb") as file:
    model_dtc = pickle.load(file)
    
with open("../models/model_gbc.pkl", "rb") as file:
    model_gbc = pickle.load(file)

# symptomes list on which the disease is to be predicted
def df_sym(symptoms, all_symptoms):
    di = {}
    for e in all_symptoms:
        di[e] = 0
    for e in symptoms:
        if e in di:
            di[e] = 1
    test = pd.DataFrame(di, index=[0])
    return test

def get_disease_name(test):
    svc_results = model_svm.predict(test)
    gnb_results = model_gnb.predict(test)
    mnb_results = model_mnb.predict(test)
    dtc_results = model_dtc.predict(test)
    rfc_results = model_rfc.predict(test)
    gbc_results = model_gbc.predict(test)
    final = mode([svc_results, gnb_results, mnb_results, dtc_results, rfc_results, gbc_results])[0][0]
    return final[0]

def get_disease_percentage(test):
    svc_results = model_svm.predict_proba(test).max()*100
    gnb_results = model_gnb.predict_proba(test).max()*100
    mnb_results = model_mnb.predict_proba(test).max()*100
    dtc_results = model_dtc.predict_proba(test).max()*100
    rfc_results = model_rfc.predict_proba(test).max()*100
    gbc_results = model_gbc.predict_proba(test).max()*100
    final = sum([svc_results, gnb_results, mnb_results, dtc_results, rfc_results, gbc_results])/6
    return "{:.2f}%".format(final)


def predict_disease(symptoms):
    train_data = pd.read_csv("../datasets/archive/Training.csv")
    x_train = train_data.drop(columns=["prognosis"]).dropna(axis=1, how="any", thresh=None, subset=None, inplace=False)
    all_symptoms = list(x_train.columns)
    test = df_sym(symptoms, all_symptoms)
    disease_name = get_disease_name(test)
    disease_percentage = get_disease_percentage(test)
    return (disease_name, disease_percentage)

if __name__ == '__main__':
    list_of_symptoms = ['itching','skin_rash','nodal_skin_eruptions']
    print(predict_disease(list_of_symptoms))

import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

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

def predict_disease(symptoms):

    train_data = pd.read_csv("../datasets/archive/Training.csv")
    test_data = pd.read_csv("../datasets/archive/Testing.csv")

    # features
    x_train = train_data.drop(columns=["prognosis"]).dropna(axis=1, how="any", thresh=None, subset=None, inplace=False)

    # labels
    y_train = train_data["prognosis"]

    all_symptoms = list(x_train.columns)
    # print('total symptomes :',len(all_symptoms))
    # symptomes.sort()
    # print(symptomes)

    diseases = list(set(y_train))
    # print('total diseases :', len(diseases))
    diseases.sort()
    # print(diseases)

    x_test = test_data.drop(columns=["prognosis"])
    y_test = test_data["prognosis"]

    # decision tree classifier
    model_dtc = DecisionTreeClassifier()

    # random forest classifier
    model_rfc = RandomForestClassifier()
    
    model_dtc.fit(x_train, y_train)
    model_rfc.fit(x_train, y_train)

    test = df_sym(symptoms, all_symptoms)
    prediction1 = model_dtc.predict(test)
    prediction2 = model_rfc.predict(test)
    print(prediction1, prediction2)
    if prediction2[0] is not None:
        return prediction2[0]
    else:
        return 'can not predict'

if __name__ == '__main__':
    list_of_symptoms = ['itching','skin_rash','nodal_skin_eruptions']
    print(predict_disease(list_of_symptoms))

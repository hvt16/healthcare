import json

def suggest_medicine(disease):
    with open("../datasets/medicines.json") as file:
        di = json.load(file)
        file.close()
    if disease in di:
        medicines = ', '.join(di[disease][:3])
    else:
        medicines = 'consult a doctor for medicines'
    return medicines
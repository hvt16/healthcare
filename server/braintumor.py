import  pickle
import numpy as np
import cv2

model=pickle.load(open('../models/model_bt.pkl','rb'))

def predict_brain_tumor():
    
    dec = {0:'No Tumor', 1:'Positive Tumor'}
    img = cv2.imread('./static/bt.jpg',0)
    img1 = cv2.resize(img, (200,200))
    img1 = img1.reshape(1,-1)/255
    p = model.predict(img1)
    return dec[p[0]]

if __name__ == "__main__":
    res = predict_brain_tumor()
    print(res)

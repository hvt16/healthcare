from keras.applications.vgg16 import preprocess_input
from keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt
from keras.models import load_model

def predict_xray():
    model = load_model('../models/model_vgg16.h5')
    img = image.load_img('./static/xray.jpeg' , target_size= (224,224))

    # plt.imshow(img)
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    img_data = preprocess_input(x)

    res = model.predict(img_data)

    # res.shape
    # res[0][1]
    # res[0][0]
    if res[0][1]>=0.8:
        # print('You have pnuemonia')
        return 'Pnuemonia'
    else :
        # print('Your scan seem to be normal')
        return 'The scan seems to be normal.'


if __name__ == "__main__":
    print("main")
    res = predict_xray()
    print(res)
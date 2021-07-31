from tensorflow.keras import *

def Prediction(Img):
    md = models.load_model('static/model/model.h5')
    result = md.predict(Img)
    return result
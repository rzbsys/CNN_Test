from tensorflow.keras.applications.resnet_v2 import preprocess_input
import numpy as np
import cv2
def Preprocessing_custom(Img):
    #색 채널 변경 BRG -> RGB
    Img = cv2.cvtColor(Img, cv2.COLOR_BGR2RGB)
    
    #전처리 진행
    Img = cv2.resize(Img, (224, 224))


    #이미지 차원 변환
    Img = Img.reshape(-1, 224, 224, 3)

    #반환
    return Img
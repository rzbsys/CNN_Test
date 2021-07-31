from flask import Flask, render_template, request, jsonify
import json, base64, cv2
from glob import glob
from pathlib import Path

#이미지 전처리 함수
from util.Pre_Processing import Preprocessing_custom

#Prediction 과정
from util.Prediction import Prediction

app = Flask(__name__)

@app.route('/')
def f1():
    return render_template('main.html')


@app.route('/upload', methods=['POST'])
def f2():
    #Request 받아오기
    filename = str(request.form.get('NAME'))
    image = str(request.form.get('IMG')).encode('UTF-8')
    
    #파일 디코딩
    filename = filename.split('.')[-1]
    image = base64.b64decode(image)
    
    #저장 경로 설정
    dir_num = len(glob('static/img/input_img/*'))
    dir = "static/img/input_img/{0}.{1}".format(dir_num, filename)
    
    #이미지 저장
    with open(dir, 'wb') as f:
        f.write(image)
        f.close()

    #이미지 불러오기
    IMG = cv2.imread(dir)
    IMG = cv2.cvtColor(IMG, cv2.COLOR_BGR2RGB)

    #이미지 전처리 진행
    IMG = Preprocessing_custom(IMG)

    #이미지 예측
    pre = Prediction(IMG)


    #이미지 BASE64 인코딩
    rtn = base64.b64encode(cv2.imencode('.' + filename, IMG[0])[1])
    rtn = rtn.decode('ascii')
    

    #return
    return json.dumps({'DATA': rtn, 'PRE':pre.tolist()})
    


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)

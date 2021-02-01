from flask import Flask, jsonify, render_template, request
import torch
import numpy as np
import sys
from neural import Net

app = Flask(__name__)

model = Net()
model.load_state_dict(torch.load('nn1.pt'))
model.eval()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nn/', methods=[ 'POST' ])
def nn():
    drawing = np.array(request.get_json()['message'])
    #drawing = np.kron(drawing, np.ones((2, 2)))
    reshaped_draw = torch.from_numpy(drawing).view(-1, 784).type(torch.float32)
    out = model(reshaped_draw)

    return {'message': torch.argmax(out).item()}


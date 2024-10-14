
from fastapi.middleware.cors import CORSMiddleware
import pickle
import tensorflow as tf
import tensorflow_text
import os
import string

from fastapi import FastAPI

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
absolute_path_mos = os.path.abspath('./models/translator_mos_fr')
absolute_path_fr = os.path.abspath('./models/translator_fr_mos_v3')

translator_mos = tf.saved_model.load(absolute_path_mos)
translator_fr= tf.saved_model.load(absolute_path_fr)

dico = {'fr':'Français', 'ms': "Mooré"}

def processing(text):
    text = text.lower()
    text=text.translate(str.maketrans("","",string.punctuation))
    return text

model_name = 'models/cid.plk'

with open(model_name, 'rb') as f:
    model = pickle.load(f)

@app.get("/")
async def root():
    
    return {"message": "Hello World"}

@app.get('/cid/{text}')
async def cid(text : str):
    txt = []
    txt.append(text)
    pred = model.predict(txt)
    lang = dico[pred[0]]
    return [{'value': pred[0], 'label': lang}]

@app.get('/translate/')
async def translate(lang: str, text : str):

    text = processing(text)
    if lang =='ms':
        value  = translator_mos(text).numpy().decode("utf-8")
    elif lang == 'fr': 
        value  = translator_fr(text).numpy().decode("utf-8")
    else:
        value = 'Erreur de langue'
    return [{'translate':value}]

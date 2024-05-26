import pandas as pd 
#use of pandas 

df = pd.read_csv('Symptom-severity.csv')

df['Symptom'] = df['Symptom'].str.replace('_',' ')
# df['Symptom'] = df['Symptom'].str.strip()

def get_rank(symptoms):
    filt = df[df['Symptom'] == symptoms]
    return filt['weight'].values[0]

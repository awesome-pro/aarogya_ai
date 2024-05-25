from random import sample
import numpy as np 
from symp_severity import get_rank

def get_sample_data(symptom_list):
    sample_1_array = np.zeros((17))
    for i in range(len(symptom_list)):
        rank = get_rank(str(symptom_list[i]))
        sample_1_array[i] = rank
    sample_2_array = np.array([sample_1_array])
    return sample_2_array
    



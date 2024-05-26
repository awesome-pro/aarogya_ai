import React, { useState } from 'react';
import { Input } from './ui/input';

interface Symptom {
  id: number;
  name: string;
}

const symptoms: Symptom[] = [
  { id: 1, name: 'Skin rash' },
  { id: 2, name: 'Nodal skin eruptions' },
  { id: 3, name: 'Continuous sneezing' },
  { id: 4, name: 'Shivering' },
  { id: 5, name: 'Chills' },
  { id: 6, name: 'Joint pain' },
  { id: 7, name: 'Stomach pain' },
  { id: 8, name: 'Acidity' },
  { id: 9, name: 'Ulcers on tongue' },
  { id: 10, name: 'Muscle wasting' },
  { id: 11, name: 'Vomiting' },
  { id: 12, name: 'Burning micturition' },
  { id: 13, name: 'Spotting urination' },
  { id: 14, name: 'Fatigue' },
  { id: 15, name: 'Weight gain' },
  { id: 16, name: 'Anxiety' },
  { id: 17, name: 'Cold hands and feets' },
  { id: 18, name: 'Mood swings' },
  { id: 19, name: 'Weight loss' },
  { id: 20, name: 'Restlessness' },
  { id: 21, name: 'Lethargy' },
  { id: 22, name: 'Patches in throat' },
  { id: 23, name: 'Irregular sugar level' },
  { id: 24, name: 'Cough' },
  { id: 25, name: 'High fever' },
  { id: 26, name: 'Sunken eyes' },
  { id: 27, name: 'Breathlessness' },
  { id: 28, name: 'Sweating' },
  { id: 29, name: 'Dehydration' },
  { id: 30, name: 'Indigestion' },
  { id: 31, name: 'Headache' },
  { id: 32, name: 'Yellowish skin' },
  { id: 33, name: 'Dark urine' },
  { id: 34, name: 'Nausea' },
  { id: 35, name: 'Loss of appetite' },
  { id: 36, name: 'Pain behind the eyes' },
  { id: 37, name: 'Back pain' },
  { id: 38, name: 'Constipation' },
  { id: 39, name: 'Abdominal pain' },
  { id: 40, name: 'Diarrhoea' },
  { id: 41, name: 'Mild fever' },
  { id: 42, name: 'Yellow urine' },
  { id: 43, name: 'Yellowing of eyes' },
  { id: 44, name: 'Acute liver failure' },
  { id: 45, name: 'Fluid overload' },
  { id: 46, name: 'Swelling of stomach' },
  { id: 47, name: 'Swelled lymph nodes' },
  { id: 48, name: 'Malaise' },
  { id: 49, name: 'Blurred and distorted vision' },
  { id: 50, name: 'Phlegm' },
  { id: 51, name: 'Throat irritation' },
  { id: 52, name: 'Redness of eyes' },
  { id: 53, name: 'Ainus pressure' },
  { id: 54, name: 'Runny nose' },
  { id: 55, name: 'Congestion' },
  { id: 56, name: 'Chest pain' },
  { id: 57, name: 'Weakness in limbs' },
  { id: 58, name: 'Fast heart rate' },
  { id: 59, name: 'Pain during bowel movements' },
  { id: 60, name: 'Pain in anal region' },
  { id: 61, name: 'Bloody stool' },
  { id: 62, name: 'Irritation in anus' },
  { id: 63, name: 'Neck pain' },
  { id: 64, name: 'Dizziness' },
  { id: 65, name: 'Cramps' },
  { id: 66, name: 'Bruising' },
  { id: 67, name: 'Obesity' },
  { id: 68, name: 'Swollen legs' },
  { id: 69, name: 'Swollen blood vessels' },
  { id: 70, name: 'Puffy face and eyes' },
  { id: 71, name: 'Enlarged thyroid' },
  { id: 72, name: 'Brittle nails' },
  { id: 73, name: 'Swollen extremeties' },
  { id: 74, name: 'Excessive hunger' },
  { id: 75, name: 'Extra marital contacts' },
  { id: 76, name: 'Drying and tingling lips' },
  { id: 77, name: 'Slurred speech' },
  { id: 78, name: 'Knee pain' },
  { id: 79, name: 'Hip joint pain' },
  { id: 80, name: 'Muscle weakness' },
  { id: 81, name: 'Stiff neck' },
  { id: 82, name: 'Swelling joints' },
  { id: 83, name: 'Movement stiffness' },
  { id: 84, name: 'Spinning movements' },
  { id: 85, name: 'Loss of balance' },
  { id: 86, name: 'Unsteadiness' },
  { id: 87, name: 'Weakness of one body side' },
  { id: 88, name: 'Loss of smell' },
  { id: 89, name: 'Bladder discomfort' },
  { id: 90, name: 'Foul smell of urine' },
  { id: 91, name: 'Continuous feel of urine' },
  { id: 92, name: 'Passage of gases' },
  { id: 93, name: 'Internal itching' },
  { id: 94, name: 'Toxic look typhos' },
  { id: 95, name: 'Depression' },
  { id: 96, name: 'Irritability' },
  { id: 97, name: 'Muscle pain' },
  { id: 98, name: 'Altered sensorium' },
  { id: 99, name: 'Red spots over body' },
  { id: 100, name: 'Belly pain' },
  { id: 101, name: 'Abnormal menstruation' },
  { id: 102, name: 'Dischromic patches' },
  { id: 103, name: 'Watering from eyes' },
  { id: 104, name: 'Increased appetite' },
  { id: 105, name: 'Polyuria' },
  { id: 106, name: 'Family history' },
  { id: 107, name: 'Mucoid sputum' },
  { id: 108, name: 'Rusty sputum' },
  { id: 109, name: 'Lack of concentration' },
  { id: 110, name: 'Visual disturbances' },
  { id: 111, name: 'Receiving blood transfusion' },
  { id: 112, name: 'Receiving unsterile injections' },
  { id: 113, name: 'Coma' },
  { id: 114, name: 'Stomach bleeding' },
  { id: 115, name: 'Distention of abdomen' },
  { id: 116, name: 'History of alcohol consumption' },
  { id: 117, name: 'Fluid overload' },
  { id: 118, name: 'Blood in sputum' },
  { id: 119, name: 'Prominent veins on calf' },
  { id: 120, name: 'Palpitations' },
  { id: 121, name: 'Painful walking' },
  { id: 122, name: 'Pus filled pimples' },
  { id: 123, name: 'Blackheads' },
  { id: 124, name: 'Scurring' },
  { id: 125, name: 'Skin peeling' },
  { id: 126, name: 'Silver like dusting' },
  { id: 127, name: 'Small dents in nails' },
  { id: 128, name: 'Inflammatory nails' },
  { id: 129, name: 'Blister' },
  { id: 130, name: 'Red sore around nose' },
  { id: 131, name: 'Yellow crust ooze' },
  { id: 132, name: 'Prognosis' }
];

const Symptoms: React.FC<{ handleSymptomSelection: (symptom: string, selected: boolean) => void }> = ({ handleSymptomSelection }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSymptomSelection = (symptom: string) => {
    const isSelected = selectedSymptoms.includes(symptom);
    const newSelectedSymptoms = isSelected
      ? selectedSymptoms.filter(s => s !== symptom)
      : [...selectedSymptoms, symptom];

    setSelectedSymptoms(newSelectedSymptoms);
    handleSymptomSelection(symptom, !isSelected);
  };

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Input 
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search symptoms..."
        className="border p-2 mb-4 w-1/2 rounded-xl"
      />
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredSymptoms.map(symptom => (
          <li
            key={symptom.id}
            onClick={() => toggleSymptomSelection(symptom.name)}
            style={{
              color: selectedSymptoms.includes(symptom.name) ? 'white' : 'black',
              cursor: 'pointer',
              padding: '8px',
              // backgroundColor: selectedSymptoms.includes(symptom.name) ? 'green' : 'white',
              borderRadius: '4px',
              border: selectedSymptoms.includes(symptom.name) ? '2px solid white' : '2px solid black'
            }}
            className={`flex justify-center ${selectedSymptoms.includes(symptom.name) ? 'bg-green-500' : 'bg-white'} items-center`}
          >
            <div>
            {symptom.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Symptoms;

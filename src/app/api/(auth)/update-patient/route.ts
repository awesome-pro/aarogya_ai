import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import PatientModel from '@/models/Patient';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  await dbConnect();

   const { id } = req.query


  if (req.method === 'POST') {
    try {
      const { name, email, phoneNumber, age, address, gender, bloodGroup, height, weight, allergies, currentMedications} = req.body;
      console.log(id);

      if (!id) {
        return res.status(400).json({ success: false, message: 'Patient ID is required' });
      }

      console.log(id);

      const updatedPatient = {
        name,
        email,
        phoneNumber,
        age,
        address,
        gender,
        bloodGroup,
        height,
        weight,
        allergies,
        currentMedications,
      };

      const result = await PatientModel.findByIdAndUpdate(id, updatedPatient, { new: true });

      if (!result) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }

      res.status(200).json({ success: true, message: 'Patient data updated successfully', data: result });
    } catch (error) {
      console.error('Error updating patient data:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

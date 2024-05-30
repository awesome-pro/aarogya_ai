import React from 'react';
import Link from 'next/link';

const facilities = [
  {
    title: 'AI Doctor',
    description: `Experience the future of healthcare with our AI Doctor. This innovative service allows you to receive medical advice from an advanced AI system by simply describing your symptoms. The AI analyzes your information, providing initial diagnostic suggestions that save you time and guide you to the appropriate specialist. With AI Doctor, you can get quick, reliable health assessments and recommendations at any time. This tool is designed to augment your healthcare experience, making it more efficient and accessible by leveraging cutting-edge technology to deliver accurate insights right when you need them.`,
    link: '/ai-doctor',
  },
  {
    title: 'Disease Prediction by Symptom',
    description: `Our Disease Prediction tool is a powerful resource that allows you to input your symptoms and receive a prediction of potential diseases. Using a comprehensive database of medical conditions and advanced algorithms, this tool analyzes your symptoms to provide a list of possible diagnoses. It helps you understand your health concerns better and prepares you for a more informed consultation with your healthcare provider. This predictive capability can significantly speed up the process of identifying underlying conditions, enabling quicker interventions and more effective treatment plans.`,
    link: '/disease-prediction',
  },
  {
    title: 'Book Doctor by Simple Search',
    description: `Our simple search feature makes finding and booking doctors incredibly easy. Whether you're looking for a specific doctor, a particular specialty, or a convenient location, our platform offers a streamlined search process. By inputting your criteria, you can quickly locate healthcare professionals who meet your needs. This service is designed to eliminate the hassle often associated with finding medical care, ensuring you can secure appointments with suitable doctors without unnecessary delays. Enjoy a hassle-free experience in accessing top-quality healthcare services through our efficient booking system.`,
    link: '/simple-search',
  },
  {
    title: 'Find Doctor',
    description: `The Find Doctor feature on our platform helps you locate medical professionals based on their specialty and geographic location. Our extensive database includes detailed profiles of doctors, allowing you to choose the best healthcare providers near you. Whether you need a general practitioner or a specialist, this service makes it easy to find qualified doctors within your vicinity. It ensures that you have access to prompt and efficient medical attention, facilitating better health outcomes by connecting you with the right professionals swiftly.`,
    link: '/find-doctor',
  },
  {
    title: 'Book Doctor by AI',
    description: `Our AI-powered booking system revolutionizes how you schedule medical appointments. By simply describing your medical issue, our AI technology identifies and books the nearest available doctor suited to your needs. This service simplifies the process of finding appropriate medical care, reducing wait times and ensuring timely attention. It leverages artificial intelligence to match your health concerns with the best nearby healthcare provider, making the booking process seamless and highly efficient. Experience the convenience and speed of our AI-driven healthcare services.`,
    link: '/book-doctor-ai',
  },
  {
    title: 'Edit Doctor Profile',
    description: `Doctors on our platform can easily manage and update their profiles to ensure patients have access to accurate information. You can edit details such as your name, email, phone number, department, experience, clinic address, consultation fee, availability, qualifications, and bio. Keeping your profile current not only helps in maintaining your professional image but also enhances patient trust and satisfaction. By providing up-to-date information, you facilitate better patient engagement and more effective healthcare delivery.`,
    link: '/edit-doctor-profile',
  },
  {
    title: 'Edit Patient Profile',
    description: `Our platform allows patients to manage their personal information and medical history efficiently. You can update your profile with details such as your name, email, phone number, and medical history. This ensures that your healthcare providers have access to the most current and accurate information, enabling personalized care. Keeping your profile up-to-date enhances the quality of care you receive and simplifies communication with your healthcare team, making your healthcare journey smoother and more effective.`,
    link: '/edit-patient-profile',
  },
  {
    title: 'Doctor Sign-Up',
    description: `Join our platform as a healthcare provider by completing the doctor sign-up process. This registration allows you to offer your medical services to a broader patient base, manage appointments, and update your professional profile with ease. Our platform provides you with the tools needed to streamline your practice, enhance patient interactions, and maintain a robust online presence. By signing up, you become part of an innovative healthcare network dedicated to improving patient care and accessibility. Start enhancing your practice and reaching more patients today.`,
    link: '/doctor-sign-up',
  },
  {
    title: 'Patient Sign-Up',
    description: `Become part of our healthcare community by signing up as a patient. Registration enables you to book appointments, manage your health records, and receive personalized medical advice tailored to your needs. Our user-friendly platform ensures you can easily connect with healthcare providers who meet your specific requirements. By signing up, you take a proactive step towards better health management, gaining access to a wealth of resources and services designed to enhance your healthcare experience. Join us today and take control of your health journey.`,
    link: '/patient-sign-up',
  },
  {
    title: 'Doctor Sign-In',
    description: `Sign in to your doctor account to manage your appointments, update your profile, and interact with patients. Our platform provides all the necessary tools to streamline your practice and maintain an effective online presence. By regularly updating your information and managing your schedule, you can ensure that patients receive the best possible care. Our system is designed to support your professional needs, making it easier for you to focus on providing quality healthcare services while we handle the administrative aspects.`,
    link: '/doctor-sign-in',
  },
  {
    title: 'Patient Sign-In',
    description: `Sign in to your patient account to book appointments, update your profile, and access your health records. Our platform ensures you stay connected with your healthcare providers and manage your health more effectively. By keeping your information current and easily accessible, you can enjoy a more personalized and efficient healthcare experience. Whether you need to schedule a visit, review your medical history, or update personal details, our system is designed to make these tasks simple and straightforward, ensuring you always have control over your healthcare journey.`,
    link: '/patient-sign-in',
  },
];

export default function Facilities() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className='flex items-center justify-center'>
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Our Facilities</h1>
        </div>
        <ul>
          {facilities.map((facility, index) => (
            <li key={index} className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{facility.title}</h2>
              <p className="text-gray-600 mb-2">{facility.description}</p>
              <Link href={facility.link}>
                <button className="text-blue-500 hover:underline">Learn More</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

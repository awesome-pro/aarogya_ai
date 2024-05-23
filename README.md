# Aarogya AI

Welcome to **Aarogya AI** – your trusted partner in healthcare. Aarogya AI leverages the power of advanced artificial intelligence to provide seamless online consultations and appointment booking. Our application integrates cutting-edge AI chatbots to ensure you receive timely and accurate health advice, right at your fingertips.

## Features

- **AI-Powered Consultations:** Interact with our AI chatbot for instant health consultations, available 24/7.
- **Seamless Appointment Booking:** Easily schedule appointments with healthcare professionals.
- **Secure Authentication:** Utilize robust authentication mechanisms to ensure your data is safe.
- **User-Friendly Interface:** Enjoy a smooth and intuitive user experience, powered by Next.js 14.
- **Reliable Data Management:** All user data is securely stored in MongoDB, ensuring both reliability and security.

## Technology Stack

- **Next.js 14:** Our frontend is built using the latest version of Next.js, providing a highly responsive and dynamic user interface.
- **Auth.js v5:** Secure authentication processes are implemented using Auth.js v5, ensuring user data and interactions are protected.
- **MongoDB:** We use MongoDB for our database management, enabling efficient and secure data handling.
- **Gemini AI:** The core of our consultation service is powered by Gemini AI, delivering accurate and reliable health advice.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/aarogya-ai.git
   cd aarogya-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

Your application should now be running on [http://localhost:3000](http://localhost:3000).


## Here are some screenshots of the application:

### Home Page 
![Home Page]('./public/screenshots/sc1.png')
![Sign In]('./public/screenshots/sc6.png')
![Sign Up]('./public/screenshots/sc5.png')
![Consultation]('./public/screenshots/sc2.png')
![Appointment]('./public/screenshots/sc3.png')
![Chatbot]('./public/screenshots/sc4.png')


## Contributing

We welcome contributions from the community! If you'd like to contribute, please fork the repository and create a pull request. Ensure your code follows our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any queries or support, please reach out to us at support@aarogya.ai.

---

Thank you for choosing Aarogya AI. We are committed to providing you with the best online healthcare experience.
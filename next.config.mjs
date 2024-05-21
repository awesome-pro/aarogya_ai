/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
            },
            {
                hostname: 'images.unsplash.com',
            },
            {
                hostname: 'via.placeholder.com',
            },
            {
                hostname: 'www.google.com'
            }
        ]
    }
};

export default nextConfig;

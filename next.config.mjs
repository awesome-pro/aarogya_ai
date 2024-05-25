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
            },
            {
                hostname: 's3-alpha-sig.figma.com'
            },{
                hostname: 'www.pexels.com'
            },{
                hostname: 'img.pikbest.com'
            },{
                hostname: 'plus.unsplash.com'
            }
        ]
    }
};

export default nextConfig;

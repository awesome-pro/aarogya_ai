// /** @type {import('next').NextConfig} */
// // const nextConfig = {
//     const nextConfig = async () => {
//         const { default: withVideos } = await import('next-videos');
//         return withVideos({
//          your other Next.js config options here
//         });
//     reactStrictMode: true,
//     images: {
//         remotePatterns: [
//             {
//                 hostname: 'res.cloudinary.com',
//             },
//             {
//                 hostname: 'images.unsplash.com',
//             },
//             {
//                 hostname: 'via.placeholder.com',
//             },
//             {
//                 hostname: 'www.google.com'
//             },
//             {
//                 hostname: 's3-alpha-sig.figma.com'
//             },{
//                 hostname: 'www.pexels.com'
//             },{
//                 hostname: 'img.pikbest.com'
//             },{
//                 hostname: 'plus.unsplash.com'
//             }
//         ]
//     }
// };

// export default nextConfig;

// // @type {import('next').NextConfig} 
// // const nextConfig = async () => {
// //     const { default: withVideos } = await import('next-videos');
// //     return withVideos({
// //       // your other Next.js config options here
// //     });
// //   };
  
// //   export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = async () => {
    const { default: withVideos } = await import('next-videos');
    
    return withVideos({
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
                },
                {
                    hostname: 'www.pexels.com'
                },
                {
                    hostname: 'img.pikbest.com'
                },
                {
                    hostname: 'plus.unsplash.com'
                }
            ]
        },
        // your other Next.js config options here
    });
};

export default nextConfig;
/** @type {import('next').NextConfig} */

import pwa from "@ducanh2912/next-pwa";

const withPWA = pwa({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    workboxOptions: {
        disableDevLogs: true
    }
})

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                
            }
        ]
    }
};

export default withPWA(nextConfig);

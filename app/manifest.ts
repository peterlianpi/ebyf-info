import type { MetadataRoute } from 'next'
import { APP_NAME, APP_SHORT_NAME, APP_DESCRIPTION } from '@/site/site-config'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: APP_NAME,
        short_name: APP_SHORT_NAME,
        description: APP_DESCRIPTION,
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ],
        theme_color: "#000",
        background_color: "#FFFFFF",
        start_url: "/",
        display: "standalone",
        orientation: "portrait"
    }
}
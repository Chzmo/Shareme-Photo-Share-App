import sanityClient from '@sanity/client';
import imageUrlBulder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion: '2021-03-25',
    useCdn:false,
    token: process.env.REACT_APP_SANITY_API_TOKEN,
    ignoreBrowserTokenWarning: true
});

const builder = imageUrlBulder(client);
export const urlFor = (source) => builder.image(source);

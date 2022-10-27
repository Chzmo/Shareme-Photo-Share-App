
import sanityClient from '@sanity/client';
import imageUrlBulder from '@sanity/image-url';

const client = sanityClient({
    projectId:process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion: '2020-10-21',
    useCdn:true,
    token: process.env.REACT_APP_SANITY_API_TOKEN,
});

const builder = imageUrlBulder(client);
export const urlFor = (source) => builder.image(source);

export default client
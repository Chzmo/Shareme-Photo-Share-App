import sanityClient from '@sanity/client';
import imageUrlBulder from '@sanity/image-url';

export const client = sanityClient({
    projectId:'',
    dataset:'production',
    apiVersion: '2020-10-21',
    useCdn:true,
    token: '',
});

const builder = imageUrlBulder(client);
export const urlFor = (source) => builder.image(source);
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGE_KIT_URL as string,
});

export { imagekit };

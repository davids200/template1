require("dotenv").config();

const environment = process.env.NODE_ENV || "dev";

module.exports = {
  
  reactStrictMode: true,
  images: { 
    domains: [
      'lh3.googleusercontent.com', 'avatars.githubusercontent.com','pbs.twimg.com','nextapp-bucket.s3.eu-west-2.amazonaws.com'], 
  formats: ['image/avif', 'image/webp',] }, 
  env: {
    MONGO_URL:process.env.MONGO_URL, 
    GOOGLE_ID:process.env.GOOGLE_ID,
    GOOGLE_SECRET:process.env.GOOGLE_SECRET, 
    GITHUB_ID:process.env.GITHUB_ID,
    GITHUB_SECRET:process.env.GITHUB_SECRET,
    TWITTER_CLIENT_ID:process.env.TWITTER_CLIENT_ID, 
    TWITTER_CLIENT_SECRET:process.env.TWITTER_CLIENT_SECRET,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    BASE_URL:process.env.BASE_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    GRAPHQL_API:process.env.GRAPHQL_API,
    PORT:process.env.PORT,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
    AWS_REGION:process.env.AWS_REGION,
    JWT_SECRET:process.env.JWT_SECRET
  },

}
//https://nextapp-bucket.s3.eu-west-2.amazonaws.com/profile/balangira-logo.png
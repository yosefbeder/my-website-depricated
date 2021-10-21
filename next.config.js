/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

module.exports = withMDX({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'i.postimg.cc'],
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});

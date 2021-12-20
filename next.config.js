/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const rehypePrism = require('@mapbox/rehype-prism');
const withMDX = require('@next/mdx')({
	extension: /\.mdx$/,
	options: {
		rehypePlugins: [rehypePrism],
	},
});

module.exports = withBundleAnalyzer(
	withMDX({
		reactStrictMode: true,
		images: {
			domains: ['avatars.githubusercontent.com', 'i.postimg.cc'],
		},
		pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
	}),
);

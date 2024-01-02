const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true
}

module.exports = withNextIntl(nextConfig)

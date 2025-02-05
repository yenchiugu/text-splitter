/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生產環境建置時忽略 ESLint 錯誤
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 
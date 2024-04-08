const config = process.env.NODE_ENV === 'production' ? 'http://api.deepandeast.synology.me:8080/' : 'http://localhost:8080'

console.log(config)

export default config;
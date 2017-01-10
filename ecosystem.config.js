module.exports = {
  apps: [{
    name: "alfred-server",
    script: "server.js",
    ignore_watch: ["node_modules", "app/views"], // used in dev, passing as "pm2" --ignore-watch doesnt work?
    env_development: {
      NODE_ENV: "development"
    },
    env: {
      COMMON_VARIABLE: "true"
    },
    env_production : {
      NODE_ENV: "production"
    }
  }],
  deploy: {
    production : {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/production",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
    },
    development: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "git@github.com:repo.git",
      path: "/var/www/development",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env dev",
      env: {
        NODE_ENV: "development"
      }
    }
  }
}

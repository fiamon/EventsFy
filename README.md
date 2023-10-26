# EventsFy
In this API, youre able to:

Register, login (jwt), find users and events (pagination), find events created by an user.
Only logged users can modify their events, only logged users can delete their events, and much more. 



# Documentation
You can access the complete documentation with:

```
git clone https://github.com/fiamon/events.git
npm install
npm run dev
http://localhost:8080/doc
```

```
📁 src
  📂 controllers
    📄 user.controller.js
  📂 middlewares
    📄 auth.middleware.js
  📂 routes
    📄 user.routes.js
  📂 repositories
    📄 user.repository.js
  📂 services
    📄 user.service.js
  📂 utils
    📂 validators
      📄 id.validator.js
  📂 database
    📄 db.config.js
  📂 models
    📄 user.model.js
  📄app.js
```

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

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=EventsFy%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ffiamon%2FEventsFy%2Fmain%2Ftests%2FInsomnia_2023-10-27.json)

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

const express = require('express')
const CatsController = require('./controllers/CatsController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

console.log('tratando de conectar a la base de datos')
// Database Client
const sqlClient = new SqlClient()
console.log('conectado a la base de datos')
// Controllers
const pageController = new PageController()
const catsController = new CatsController(sqlClient)

// Routes
router.get('/', catsController.renderHomeWithCats)
router.get('/about', pageController.renderAbout)

router.get('/cats/create', catsController.renderCatCreationForm)
router.post('/cats/create', catsController.insertAndRenderCat)

router.get('/cats/:id', catsController.renderSingleCat)

router.get('/cats/:id/update', catsController.renderCatUpdateForm)
router.post('/cats/:id/update', catsController.updateAndRenderCat)

router.post('/cats/:id/delete', catsController.deleteCatAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router

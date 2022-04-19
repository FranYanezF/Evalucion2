const CatsDAO = require('../models/dao/CatsDAO')

class CatsController {
  constructor (db) {
    this.CatsDao = new CatsDAO(db)
    this.renderHomeWithCats = this.renderHomeWithCats.bind(this)
    this.renderSingleCat = this.renderSingleCat.bind(this)
    this.renderCatCreationForm = this.renderCatCreationForm.bind(this)
    this.renderCatUpdateForm = this.renderCatUpdateForm.bind(this)
    this.insertAndRenderCat = this.insertAndRenderCat.bind(this)
    this.updateAndRenderCat = this.updateAndRenderCat.bind(this)
    this.deleteCatAndRenderResponse = this.deleteCatAndRenderResponse.bind(this)
  }

  async renderHomeWithCats (req, res) {
    const Cats = await this.CatsDao.getAll()
    res.render('home', {
      Cats
    })
  }

  async renderSingleCat (req, res) {
    const id = req.params.id

    try {
      const Cat = await this.CatsDao.getById(id)

      if (!Cat) {
        res.status(404).render('404')
        return
      }

      res.render('cats', {
        id,
        nombre: Cat.nombre,
        raza: Cat.raza,
        color: Cat.color,
        edad: Cat.edad,
        pais: Cat.pais
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderCatCreationForm (req, res) {
    res.render('cats-form')
  }

  async renderCatUpdateForm (req, res) {
    const id = req.params.id

    try {
      const Cat = await this.CatsDao.getById(id)

      if (!Cat) {
        res.status(404).render('404')
        return
      }

      res.render('cats-form', {
        id,
        nombre: Cat.nombre,
        raza: Cat.raza,
        color: Cat.color,
        edad: Cat.edad,
        pais: Cat.pais
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderCat (req, res) {
    const nombre = req.body.nombre
    const raza = req.body.raza
    const color = req.body.color
    const edad = req.body.edad
    const pais = req.body.pais

    const Cat = { nombre, raza, color, edad, pais }

    try {
      const id = await this.CatsDao.create(Cat)

      res.redirect(`/cats/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderCat (req, res) {
    const id = req.params.id
    const nombre = req.body.nombre
    const raza = req.body.raza
    const color = req.body.color
    const edad = req.body.edad
    const pais = req.body.pais

    try {
      const Cat = { nombre, raza, color, edad, pais, id }

      await this.CatsDao.update(Cat)

      res.redirect(`/cats/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteCatAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const Cat = await this.CatsDao.getById(id)

      if (!Cat) {
        res.status(404).render('404')
        return
      }

      await this.CatsDao.delete(id)

      res.render('cats-deleted', {
        id,
        nombre: Cat.nombre
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = CatsController

class CatsDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id,nombre, raza, color,edad,pais FROM gatos')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id,nombre, raza, color,edad,pais FROM gatos WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (cat) {
    const response = await this.db.query('INSERT INTO gatos (nombre, raza,color,edad,pais) VALUES (?, ?,?,?,?)', [cat.nombre, cat.raza, cat.color, cat.edad, cat.pais])
    const result = response[0]
    return result.insertId
  }

  async update (cat) {
    const response = await this.db.query('UPDATE gatos SET nombre = ?, raza = ?,color = ?, edad = ?, pais = ?  WHERE id = ?', [cat.nombre, cat.raza, cat.color, cat.edad, cat.pais, cat.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM gatos WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = CatsDAO

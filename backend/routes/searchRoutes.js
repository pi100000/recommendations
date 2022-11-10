const express = require('express')
const router = express.Router()
const { setSearch, addCompany } = require('../controllers/searchController')

router.post('/', setSearch)

// router.post('/', addCompany)

module.exports = router
const express = require("express");
const { getAllCompanies } = require("../controllers/companyController");

const router = express.Router();

router.get("/all", getAllCompanies);

module.exports = router;

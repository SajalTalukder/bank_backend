const express = require("express");
const {
  getAllCompanies,
  getAllCompaniesTotalStates,
  getALlCompaniesStats,
} = require("../controllers/companyController");

const router = express.Router();

router.get("/all", getAllCompanies);
router.get("/total-stats", getAllCompaniesTotalStates);
router.get("/stats", getALlCompaniesStats);

module.exports = router;

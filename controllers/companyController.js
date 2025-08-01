const catchAsync = require("../utils/catchAsync");
const Company = require("../model/companyModel");

exports.getAllCompanies = catchAsync(async (req, res, next) => {
  const companies = await Company.find().sort({ name: 1 });
  res.status(200).json({
    status: "success",
    results: companies.length,
    data: {
      companies,
    },
  });
});

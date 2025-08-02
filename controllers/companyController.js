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

exports.getAllCompaniesTotalStates = catchAsync(async (req, res, next) => {
  const companies = await Company.find();
  const totalCompanies = companies.length;
  const totalReviews = companies.reduce(
    (acc, c) => acc + (c.totalReviews || 0),
    0
  );
  const totalComplaints = companies.reduce(
    (acc, c) => acc + (c.negativeCount || 0),
    0
  );
  const averageComplaintRate =
    totalReviews === 0
      ? 0
      : ((totalComplaints / totalReviews) * 100).toFixed(2);

  const stats = {
    totalCompanies,
    totalReviews,
    averageComplaintRate: Number(averageComplaintRate), // in percentage
  };

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getALlCompaniesStats = catchAsync(async (req, res, next) => {
  const { sort, page = 1, limit = 10, search = "" } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // Step 1: Fetch all companies (unpaginated for calculating complaintRate first)
  // Step 1: Fetch all companies, filtered by search (case-insensitive)
  let allCompanies = await Company.find({
    name: { $regex: search, $options: "i" },
  }).lean();

  // Step 2: Calculate complaint rate manually
  allCompanies = allCompanies.map((company) => {
    const { negativeCount, totalReviews } = company;
    const complaintRate =
      totalReviews === 0
        ? 0
        : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));
    return {
      ...company,
      complaintRate,
    };
  });

  // Step 3: Sort based on query
  switch (sort) {
    case "reviews_asc":
      allCompanies.sort((a, b) => a.totalReviews - b.totalReviews);
      break;
    case "reviews_desc":
      allCompanies.sort((a, b) => b.totalReviews - a.totalReviews);
      break;
    case "complaints_asc":
      allCompanies.sort((a, b) => a.complaintRate - b.complaintRate);
      break;
    case "complaints_desc":
      allCompanies.sort((a, b) => b.complaintRate - a.complaintRate);
      break;
    default:
      allCompanies.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
  }

  const totalCompanies = allCompanies.length;
  const totalPages = Math.ceil(totalCompanies / limitNumber);

  // Step 4: Paginate manually
  const paginatedCompanies = allCompanies.slice(skip, skip + limitNumber);
  // Step 5: Send response
  res.status(200).json({
    status: "success",
    totalCompanies,
    totalPages,
    currentPage: pageNumber,
    count: paginatedCompanies.length,
    data: {
      companies: paginatedCompanies,
    },
  });
});

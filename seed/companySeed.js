const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("../model/companyModel");

// Optional: if you're using a separate DB config file
// const connectDB = require("../config/db");
// await connectDB();

dotenv.config({ path: "../config.env" });

// Connect to DB
const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

// Your bank/company list
const banks = [
  "Janata Bank",
  "Sonali Bank",
  "Rupali Bank",
  "Basic Bank",
  "Bangladesh Development Bank",
  "Bangladesh Krishi Bank",
  "Rajshahi Krishi Unnayan Bank",
  "Probashi Kallyan Bank",
  "Grameen Bank",
  "Ansar-VDP Unnayan Bank",
  "Jubilee Bank",
  "Palli Sanchay Bank",
  "AB Bank",
  "Bangladesh Commerce Bank",
  "Bank Asia",
  "Bengal Commercial Bank",
  "BRAC Bank",
  "City Bank",
  "Community Bank Bangladesh",
  "Citizens Bank",
  "Dhaka Bank",
  "Dutch-Bangla Bank",
  "Eastern Bank",
  "IFIC Bank",
  "Jamuna Bank",
  "Meghna Bank",
  "Mercantile Bank",
  "Midland Bank",
  "Modhumoti Bank",
  "Mutual Trust Bank",
  "National Credit & Commerce Bank",
  "NRB Bank",
  "NRBC Bank",
  "ONE Bank",
  "Premier Bank",
  "Prime Bank",
  "Pubali Bank",
  "Southeast Bank",
  "South Bangla Agriculture & Commerce Bank",
  "Shimanto Bank",
  "Trust Bank",
  "United Commercial Bank",
  "Uttara Bank",
  "Exim Bank",
  "Al-Arafah Islami Bank",
  "First Security Islami Bank",
  "Global Islami Bank",
  "ICB Islamic Bank",
  "Islami Bank Bangladesh",
  "Shahjalal Islami Bank",
  "Social Islami Bank",
  "Standard Bank",
  "Union Bank",
  "Bank Al-Falah",
  "Citibank",
  "Commercial Bank of Ceylon",
  "Habib Bank",
  "HSBC",
  "National Bank of Pakistan",
  "Standard Chartered Bank",
  "State Bank of India",
  "Woori Bank",
  "Investment Corporation of Bangladesh (ICB)",
  "IDLC Finance",
  "LankaBangla Finance",
  "United Finance",
  "Uttara Finance & Investments Ltd",
  "United Leasing Company Ltd",
  "Union Capital Ltd",
  "Reliance Finance Ltd",
  "Prime Finance & Investment Ltd",
  "Premier Leasing & Finance Ltd",
  "Phoenix Finance and Investments Ltd",
  "People's Leasing & Financial Services Ltd",
  "National Housing Finance & Investments Ltd",
  "National Finance Ltd",
  "MIDAS Financing Ltd",
  "Islamic Finance & Investment Ltd",
  "International Leasing & Financial Services Ltd",
  "IDCOL Ltd",
  "IPDC Ltd",
  "IIDFC Ltd",
  "bKash",
  "Nagad",
  "Pathao Pay",
  "Upay",
  "Rocket",
];

// Insert Companies
const addCompanies = async () => {
  try {
    await Company.deleteMany(); // optional: to prevent duplicates
    const formatted = banks.map((name) => ({
      name: name.trim(),
      totalReviews: 0,
      positiveCount: 0,
      negativeCount: 0,
      nutralCount: 0,
      reviews: [],
    }));
    await Company.insertMany(formatted);
    console.log("✅ Companies added successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error adding companies:", err);
    process.exit(1);
  }
};

// Delete all companies
const deleteCompanies = async () => {
  try {
    await Company.deleteMany();
    console.log("🗑️ All companies deleted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error deleting companies:", err);
    process.exit(1);
  }
};

// CLI logic
const run = async () => {
  const arg = process.argv[2];
  if (arg === "--add") {
    await addCompanies();
  } else if (arg === "--delete") {
    await deleteCompanies();
  } else {
    console.log("❓ Use '--add' to seed or '--delete' to wipe companies.");
    process.exit(0);
  }
};

run();

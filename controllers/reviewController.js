const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");
const Story = require("../model/reviewModel");

function generateAnonymousId() {
  return "Anon-" + crypto.randomBytes(3).toString("hex"); // Example: Anon-a3f9c2
}

exports.createStory = catchAsync(async (req, res, next) => {
  const { vibe, companyName, isAnonymous, name, userType, title, story } =
    req.body;
  if (!isAnonymous && !name) {
    return next(new AppError("Name is required when not anonymous", 400));
  }
  const newStory = new Story({
    vibe,
    companyName,
    isAnonymous,
    name: isAnonymous ? undefined : name,
    anonymousId: isAnonymous ? generateAnonymousId() : undefined,
    userType,
    title,
    story,
  });

  await newStory.save();

  res.status(201).json({
    status: "success",
    message: "Story created successfully",
    data: {
      story: newStory,
    },
  });
});

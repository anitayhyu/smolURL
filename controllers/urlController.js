const Url = require("../models/urlModel");
const mongoose = require("mongoose");
const utils = require("../util/util");
const { nanoid } = require("nanoid");
const asyncHandler = require("express-async-handler");

// create a short URL for non authenticated user
// POST /api/url/short
const createShortUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check long URL validity
  if (!utils.isValidHttpUrl(longUrl)) {
    res.status(400);
    throw new Error("Invalid long URL");
  }

  // Check if URL already exists
  let url = await Url.findOne({ longUrl });
  if (url) {
    return res.json(url.shortUrl);
  }

  // Create shortened URL ID and short URL
  const urlId = nanoid(7);
  const shortUrl = `${baseUrl}/${urlId}`;

  // Create new URL document and save to database
  url = new Url({
    longUrl,
    shortUrl,
    urlId,
    date: new Date(),
  });

  await url.save();

  res.status(200).json(url);
});

// create a short URL as authenticated user
// POST /api/url/authshort
const createAuthShortUrl = asyncHandler(async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!utils.isValidHttpUrl(longUrl)) {
    res.status(400);
    throw new Error("Invalid long URL");
  }

  let url = await Url.findOne({ longUrl });
  if (url) {
    return res.json(url);
  }

  const urlId = nanoid(7);
  const shortUrl = `${baseUrl}/${urlId}`;

  url = new Url({
    longUrl,
    shortUrl,
    urlId,
    date: new Date(),
    user: req.user ? req.user._id : null,
  });

  await url.save();
  res.status(200).json(url);
});

// redirect short URL to long/original URL by matching ID
// GET /:urlId
const redirectUrl = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ urlId: req.params.urlId });
  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.longUrl);
  } else {
    return res.status(404).json("No URL found");
  }
});

// GET /api/url/
// get authenticated user's short URLs
const getShortUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ user: req.user.id });
  res.status(200).json(urls);
});

// GET /api/url
// get non-authenticated user's short URLs
const getPublicShortUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ longUrl });
  res.status(200).json(urls);
});

module.exports = {
  createShortUrl,
  redirectUrl,
  getShortUrls,
  createAuthShortUrl,
  getPublicShortUrls,
};

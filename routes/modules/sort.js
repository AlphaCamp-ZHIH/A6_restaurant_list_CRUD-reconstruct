const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

router.get("/A-Z", (req, res) => {
  Restaurants.find()
    .sort({ name_en: "asc" })
    .lean()
    .then((restaurants) =>
      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants,
        sort: "A-Z",
      })
    );
});

router.get("/Z-A", (req, res) => {
  Restaurants.find()
    .sort({ name_en: "desc" })
    .lean()
    .then((restaurants) =>
      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants,
        sort: "Z-A",
      })
    );
});

router.get("/category", (req, res) => {
  Restaurants.find()
    .sort({ category: "asc" })
    .lean()
    .then((restaurants) =>
      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants,
        sort: "類別",
      })
    );
});
router.get("/location", (req, res) => {
  Restaurants.find()
    .sort({ location: "asc" })
    .lean()
    .then((restaurants) =>
      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants,
        sort: "地區",
      })
    );
});
module.exports = router;

const express = require('express');
const router = express.Router();

const Restaurants = require('../../models/restaurants');

// search 餐廳
router.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  return Restaurants.find()
    .lean()
    .then(restaurants => {
      const filterList = restaurants.filter(
        (restaurant) =>
          restaurant.name.includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      );
      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants: filterList,
      });
    })
    .catch(() => console.log('search error'))

});


//render index
router.get("/", (req, res) => {
  return Restaurants.find()
    .lean()
    .then(restaurants =>

      res.render("index", {
        pageTitle: "index",
        isIndex: true,
        restaurants: restaurants,
      })
    )
    .catch(() => console.log('index error'))

});

module.exports = router;
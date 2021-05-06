const express = require('express');
const router = express.Router();
const Restaurants = require('../../models/restaurants');

//create 餐廳
router.get('/add', (req, res) => {
  res.render('add')
});
router.post('/', (req, res) => {
  return Restaurants.create(req.body)
    .then(() => {
      console.log('create successfully');
      res.redirect('/')
    })
    .catch(error => console.log('create error'))
});
// 餐廳detail
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .lean()
    .then(restaurant =>
      res.render("show", { pageTitle: restaurant.name, restaurant: restaurant, useUnifiedTopology: true })
    )
    .catch(error => console.log('detail error'))
});

//編集餐廳
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => console.log('edit error'));
});
router.put('/:id', (req, res) => {
  const data = Object.keys(req.body);
  const id = req.params.id;
  return Restaurants.findById(id)
    .then(restaurant => {
      data.forEach(key => {
        restaurant[key] = req.body[key];
      })
      return restaurant.save();
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log('put error'))
});
// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Restaurants.findById(id)
    .then(restaurant => {

      return restaurant.remove()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log('delete error'))
})

module.exports = router;
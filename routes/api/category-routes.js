const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET ALL CATEGORIES AND RELATED PRODUCTS
router.get('/', async (req, res) => {
  try {
    // find all categories, include related products
    const categories = await Category.findAll( {include: [{model: Product}] } );
    res.status(200).json(categories);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//GET SPECIFIC CATEGORY AND RELATED PRODUCTS
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value, include related products
    const category = await Category.findByPk(req.params.id, { include: [{model: Product }]
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//ADD NEW CATEGORY
router.post('/', async (req, res) => {
  try {
  // create a new category
  const category = await Category.create( req.body );
  res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE SPECIFIC CATEGORY
router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const category = await Category.update( req.body, 
      {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(category);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CATEGORY
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const category = Category.destroy( 
    {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(category);
  }
catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;

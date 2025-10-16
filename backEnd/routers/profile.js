const router = require("express").Router();

router.post("/Create-profile/", (req, res, next) => {
  try {
    const profileParameter = ({
      gender,
      age,
      height,
      target,
      activity,
      kosher,
      vergen,
      elergani,
      favoFoods,
    } = req.body);

    res.status(201).json({
      massage: "Profile created.",
      profileParameter,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

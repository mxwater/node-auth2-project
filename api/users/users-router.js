const router = require("express").Router();
const Users = require("./users-model.js");
const { restricted, only } = require("../auth/auth-middleware.js");

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.
 */
router.get("/", restricted, (req, res, next) => { 
  Users.find()
    .then(users => {
      res.status(200).json(users); 
    })
    .catch(next);
});

/**
  [GET] /api/users/:user_id

  This endpoint is RESTRICTED: only authenticated users with role 'admin'
  should have access.
 */
router.get("/:user_id", restricted, only('admin'), (req, res, next) => { 
  Users.findById(req.params.user_id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(next);
});

module.exports = router;

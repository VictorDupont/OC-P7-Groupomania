const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const authCtrl = require("../controllers/auth");
const auth = require("../middlewares/auth");

const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 3,
	message: {
		error: {
			errors: [
				{
					path: "g",
					message:
						"SÉCURITÉ : Pour la protection de Groupomania et de ses utilisateurs, vous n'êtes pas autorisé à effectuer plus de 3 actions par minute sur l'inscription et la connexion",
				},
			],
		},
	},
});

router.post("/signup", limiter, authCtrl.signup);
router.post("/login", limiter, authCtrl.login);
router.get("/me", auth, authCtrl.getCurrentUser);

module.exports = router;

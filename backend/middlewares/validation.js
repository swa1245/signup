// for sever side validation
const Joi = require("joi");
 const signupVlaidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10),
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(5).max(20),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({
      message: "bad request",
      error,
    });
  }
  next();
};
 const loginVlaidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).email(),
    password: Joi.string().min(5).max(20),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({
      message: "bad request",
      error,
    });
  }
  next();
};

module.exports={loginVlaidation,signupVlaidation}

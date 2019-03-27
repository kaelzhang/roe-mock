module.exports = ({router, controller}) => {
  router.get('/hello', controller.say.hello)
}

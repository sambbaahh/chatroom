const configureSocketIo = (io, passport) => {
  io.engine.use((req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      passport.authenticate('jwt', { session: false })(req, res, next);
    } else {
      next();
    }
  });
};

export default configureSocketIo;

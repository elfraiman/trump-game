module.exports = (req, res) => {
  const listOfTweets = ['There is no one I respect more then Vladimir Putin. He is a great leader and a tender man.'];
  res.status(200).send(listOfTweets);
};

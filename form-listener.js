form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(radioVal);
  chuckNorris(radioVal).then((data) => {
    if (data.total) {
      data.result.forEach((element) => {
        new Joke(element).renderJoke();
        listenLikes();
      });
    } else {
      new Joke(data).renderJoke();
      listenLikes();
    }
  });
});

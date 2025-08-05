import { Howl } from 'howler';

//Music by <a href="https://pixabay.com/users/nickpanek620-38266323/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=357518">Nicholas Panek</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=357518">Pixabay</a>

export const music = new Howl({
  src: ['/assets/chiptune-loop.mp3'],
  loop: true,
  volume: 0.5,
});


  const players = [
    {
      img: '/assets/ar2020folstad.jpg',
      name: 'JoakimFolstad',
      year: '2020',
      text: 'Oumbärlig försvarsklippa med hjärta i varje tackling.'
    },
    {
      img: '/assets/ar2021eidehall.jpg',
      name: 'Mathias Eidehall',
      year: '2021',
      text: 'Teknisk begåvning som styrde mittfältet.'
    },
    {
      img: '/assets/ar2022Hansson.jpg',
      name: 'Rickard Hansson',
      year: '2022',
      text: 'Fintar, mål och ledarskap i ett och samma paket.'
    },
    {
      img: '/assets/ar2023kopcke.jpg',
      name: 'Viktor Kopcke',
      year: '2023',
      text: 'Stabil, taktisk och med enorm arbetskapacitet.'
    },
    {
      img: '/assets/ar2024Filip.jpg',
      name: 'Filip Jäätmaa',
      year: '2024',
      text: 'Ledarfigur och bolltrygg. En självklar vinnare.'
    }
  ];

  let currentIndex = 4;

  function updatePlayer(index) {
    const p = players[index];
    document.getElementById('playerImage').src = p.img;
    document.getElementById('playerName').textContent = p.name;
    document.getElementById('playerText').textContent = p.text;
    document.getElementById('playerYear').textContent = p.year;
    currentIndex = index;
  }

  document.getElementById('prevPlayer').addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + players.length) % players.length;
    updatePlayer(newIndex);
  });

  document.getElementById('nextPlayer').addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % players.length;
    updatePlayer(newIndex);
  });
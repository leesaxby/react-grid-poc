/**
 * Generate random data for use in examples.
 */
export function generateRandomList() {
  const list = [];

  for (var i = 0; i < 1000000; i++) {
    const random = loremIpsum[i % loremIpsum.length];
    const randoms = [random];

    for (let j = Math.round(Math.random() * 10); j--; ) {
      randoms.push(loremIpsum[(i * j) % loremIpsum.length]);
    }

    list.push({
      color: BADGE_COLORS[i % BADGE_COLORS.length],
      index: i,
      name: NAMES[i % NAMES.length],
      age: AGES[i % AGES.length],
      date: DATES[i % DATES.length],
      random,
      randomLong: randoms.join(' '),
      size: ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)],
    });
  }

  return list;
}

const BADGE_COLORS = [
  '#f44336',
  '#3f51b5',
  '#4caf50',
  '#ff9800',
  '#2196f3',
  '#374046',
  '#cddc39',
  '#2196f3',
  '#9c27b0',
  '#ffc107',
  '#009688',
  '#673ab7',
  '#ffeb3b',
  '#cddc39',
  '#795548',
];
const AGES = [
  '34',
  '22',
  '66',
  '44',
  '53',
  '73',
  '35',
  '57',
  '13',
  '34',
  '56',
  '86',
  '45',
  '32',
  '12',
  '3',
  '65',
  '67',
  '87',
  '56',
  '45',
  '45',
  '6',
  '76',
  '2',
  '5',
  '8',
  '5',
  '2',
  '45',
  '7',
  '55',
  '3',
  '23',
  '98',
  '54',
  '4',
  '23',
  '45',
  '56',
  '73',
  '34',
  '86',
  '72',
];
const NAMES = [
  'Peter Brimer',
  'Tera Gaona',
  'Kandy Liston',
  'Lonna Wrede',
  'Kristie Yard',
  'Raul Host',
  'Yukiko Binger',
  'Velvet Natera',
  'Donette Ponton',
  'Loraine Grim',
  'Shyla Mable',
  'Marhta Sing',
  'Alene Munden',
  'Holley Pagel',
  'Randell Tolman',
  'Wilfred Juneau',
  'Naida Madson',
  'Marine Amison',
  'Glinda Palazzo',
  'Lupe Island',
  'Cordelia Trotta',
  'Samara Berrier',
  'Era Stepp',
  'Malka Spradlin',
  'Edward Haner',
  'Clemencia Feather',
  'Loretta Rasnake',
  'Dana Hasbrouck',
  'Sanda Nery',
  'Soo Reiling',
  'Apolonia Volk',
  'Liliana Cacho',
  'Angel Couchman',
  'Yvonne Adam',
  'Jonas Curci',
  'Tran Cesar',
  'Buddy Panos',
  'Rosita Ells',
  'Rosalind Tavares',
  'Renae Keehn',
  'Deandrea Bester',
  'Kelvin Lemmon',
  'Guadalupe Mccullar',
  'Zelma Mayers',
  'Laurel Stcyr',
  'Edyth Everette',
  'Marylin Shevlin',
  'Hsiu Blackwelder',
  'Mark Ferguson',
  'Winford Noggle',
  'Shizuko Gilchrist',
  'Roslyn Cress',
  'Nilsa Lesniak',
  'Agustin Grant',
  'Earlie Jester',
  'Libby Daigle',
  'Shanna Maloy',
  'Brendan Wilken',
  'Windy Knittel',
  'Alice Curren',
  'Eden Lumsden',
  'Klara Morfin',
  'Sherryl Noack',
  'Gala Munsey',
  'Stephani Frew',
  'Twana Anthony',
  'Mauro Matlock',
  'Claudie Meisner',
  'Adrienne Petrarca',
  'Pearlene Shurtleff',
  'Rachelle Piro',
  'Louis Cocco',
  'Susann Mcsweeney',
  'Mandi Kempker',
  'Ola Moller',
  'Leif Mcgahan',
  'Tisha Wurster',
  'Hector Pinkett',
  'Benita Jemison',
  'Kaley Findley',
  'Jim Torkelson',
  'Freda Okafor',
  'Rafaela Markert',
  'Stasia Carwile',
  'Evia Kahler',
  'Rocky Almon',
  'Sonja Beals',
  'Dee Fomby',
  'Damon Eatman',
  'Alma Grieve',
  'Linsey Bollig',
  'Stefan Cloninger',
  'Giovanna Blind',
  'Myrtis Remy',
  'Marguerita Dostal',
  'Junior Baranowski',
  'Allene Seto',
  'Margery Caves',
  'Nelly Moudy',
  'Felix Sailer',
];
const ROW_HEIGHTS = [50, 75, 100];

const loremIpsum = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Phasellus vulputate odio commodo tortor sodales, et vehicula ipsum viverra.',
  'In et mollis velit, accumsan volutpat libero.',
  'Nulla rutrum tellus ipsum, eget fermentum sem dictum quis.',
  'Suspendisse eget vehicula elit.',
  'Proin ut lacus lacus.',
  'Aliquam erat volutpat.',
  'Vivamus ac suscipit est, et elementum lectus.',
  'Cras tincidunt nisi in urna molestie varius.',
  'Integer in magna eu nibh imperdiet tristique.',
  'Curabitur eu pellentesque nisl.',
  'Etiam non consequat est.',
  'Duis mi massa, feugiat nec molestie sit amet, suscipit et metus.',
  'Curabitur ac enim dictum arcu varius fermentum vel sodales dui.',
  'Ut tristique augue at congue molestie.',
  'Integer semper sem lorem, scelerisque suscipit lacus consequat nec.',
  'Etiam euismod efficitur magna nec dignissim.',
  'Morbi vel neque lectus.',
  'Etiam ac accumsan elit, et pharetra ex.',
  'Suspendisse vitae gravida mauris.',
  'Pellentesque sed laoreet erat.',
  'Nam aliquet purus quis massa eleifend, et efficitur felis aliquam.',
  'Fusce faucibus diam erat, sed consectetur urna auctor at.',
  'Praesent et nulla velit.',
  'Cras eget enim nec odio feugiat tristique eu quis ante.',
  'Morbi blandit diam vitae odio sollicitudin finibus.',
  'Integer ac ante fermentum, placerat orci vel, fermentum lacus.',
  'Maecenas est elit, semper ut posuere et, congue ut orci.',
  'Phasellus eget enim vitae nunc luctus sodales a eu erat.',
  'Curabitur dapibus nisi sed nisi dictum, in imperdiet urna posuere.',
  'Vivamus commodo odio metus, tincidunt facilisis augue dictum quis.',
  'Curabitur sagittis a lectus ac sodales.',
  'Nam eget eros purus.',
  'Nam scelerisque et ante in porta.',
  'Proin vitae augue tristique, malesuada nisl ut, fermentum nisl.',
  'Nulla bibendum quam id velit blandit dictum.',
  'Cras tempus ac dolor ut convallis.',
  'Sed vel ipsum est.',
  'Nulla ut leo vestibulum, ultricies sapien ac, pellentesque dolor.',
  'Etiam ultricies maximus tempus.',
  'Donec dignissim mi ac libero feugiat, vitae lacinia odio viverra.',
  'Curabitur condimentum tellus sit amet neque posuere, condimentum tempus purus eleifend.',
  'Donec tempus, augue id hendrerit pretium, mauris leo congue nulla, ac iaculis erat nunc in dolor.',
  'Praesent vel lectus venenatis, elementum mauris vitae, ullamcorper nulla.',
  'Maecenas non diam cursus, imperdiet massa eget, pellentesque ex.',
  'Vestibulum luctus risus vel augue auctor blandit.',
  'Nullam augue diam, pulvinar sed sapien et, hendrerit venenatis risus.',
  'Quisque sollicitudin nulla nec tellus feugiat hendrerit.',
  'Vestibulum a eros accumsan, lacinia eros non, pretium diam.',
  'Aenean iaculis augue sit amet scelerisque aliquam.',
  'Donec ornare felis et dui hendrerit, eget bibendum nibh interdum.',
  'Maecenas tellus magna, tristique vitae orci vel, auctor tincidunt nisi.',
  'Fusce non libero quis velit porttitor maximus at eget enim.',
  'Sed in aliquet tellus.',
  'Etiam a tortor erat.',
  'Donec nec diam vel tellus egestas lobortis.',
  'Vivamus dictum erat nulla, sit amet accumsan dolor scelerisque eu.',
  'In nec eleifend ex, pellentesque dapibus sapien.',
  'Duis a mollis nisi.',
  'Sed ornare nisl sit amet dolor pellentesque, eu fermentum leo interdum.',
  'Sed eget mauris condimentum, molestie justo eu, feugiat felis.',
  'Nunc suscipit leo non dui blandit, ac malesuada ex consequat.',
  'Morbi varius placerat congue.',
  'Praesent id velit in nunc elementum aliquet.',
  'Sed luctus justo vitae nibh bibendum blandit.',
  'Sed et sapien turpis.',
  'Nulla ac eros vestibulum, mollis ante eu, rutrum nulla.',
  'Sed cursus magna ut vehicula rutrum.',
  'Ut consectetur feugiat consectetur.',
  'Nulla nec ligula posuere neque sollicitudin rutrum a a dui.',
  'Nulla ut quam odio.',
  'Integer dignissim sapien et orci sodales volutpat.',
  'Nullam a sapien leo.',
  'Praesent cursus semper purus, vitae gravida risus dapibus mattis.',
  'Sed pellentesque nulla lorem, in commodo arcu feugiat sed.',
  'Phasellus blandit arcu non diam varius ornare.',
];

const DATES = [
  '2013-04-04',
  '2013-04-05',
  '2013-04-06',
  '2013-04-07',
  '2013-04-08',
  '2013-04-09',
  '2013-04-10',
  '2013-04-11',
  '2013-04-12',
  '2013-04-13',
  '2013-04-14',
  '2013-04-15',
  '2013-04-16',
  '2013-04-17',
  '2013-04-18',
  '2013-04-19',
  '2013-04-20',
  '2013-04-21',
  '2013-04-22',
  '2013-04-23',
  '2013-04-24',
  '2013-04-25',
  '2013-04-26',
  '2013-04-27',
  '2013-04-28',
  '2013-04-29',
  '2013-04-30',
  '2013-05-01',
  '2013-05-02',
  '2013-05-03',
  '2013-05-04',
  '2013-05-05',
  '2013-05-06',
  '2013-05-07',
  '2013-05-08',
  '2013-05-09',
  '2013-05-10',
  '2013-05-11',
  '2013-05-12',
  '2013-05-13',
  '2013-05-14',
  '2013-05-15',
  '2013-05-16',
  '2013-05-17',
  '2013-05-18',
  '2013-05-19',
  '2013-05-20',
  '2013-05-21',
  '2013-05-22',
  '2013-05-23',
  '2013-05-24',
  '2013-05-25',
  '2013-05-26',
  '2013-05-27',
  '2013-05-28',
  '2017-09-22',
  '2017-09-23',
  '2017-09-24',
  '2017-09-25',
  '2017-09-26',
  '2017-09-27',
  '2017-09-28',
  '2017-09-29',
  '2017-09-30',
  '2017-10-01',
  '2017-10-02',
  '2017-10-03',
  '2017-10-04',
  '2017-10-05',
  '2017-10-06',
  '2017-10-07',
  '2017-10-08',
  '2017-10-09',
  '2017-10-10',
  '2017-10-11',
  '2017-10-12',
  '2017-10-13',
  '2017-10-14',
  '2017-10-15',
  '2017-10-16',
  '2017-10-17',
  '2017-10-18',
  '2017-10-19',
  '2017-10-20',
  '2017-10-21',
  '2017-10-22',
  '2017-10-23',
  '2017-10-24',
  '2017-10-25',
  '2017-10-26',
  '2017-10-27',
  '2017-10-28',
  '2017-10-29',
  '2017-10-30',
  '2017-10-31',
  '2017-11-01',
  '2017-11-02',
  '2017-11-03',
  '2017-11-04',
  '2017-11-05',
  '2017-11-06',
  '2017-11-07',
  '2017-11-08',
  '2017-11-09',
  '2017-11-10',
  '2017-11-11',
  '2017-11-12',
  '2017-11-13',
  '2017-11-14',
  '2017-11-15',
  '2017-11-16',
  '2017-11-17',
  '2017-11-18',
  '2017-11-19',
  '2017-11-20',
  '2017-11-21',
  '2017-11-22',
  '2017-11-23',
  '2017-11-24',
  '2017-11-25',
  '2017-11-26',
  '2017-11-27',
  '2017-11-28',
  '2017-11-29',
  '2017-11-30',
  '2017-12-01',
  '2017-12-02',
  '2016-04-02',
  '2016-04-03',
  '2016-04-04',
  '2016-04-05',
  '2016-04-06',
  '2016-04-07',
  '2016-04-08',
  '2016-04-09',
  '2016-04-10',
  '2016-04-11',
  '2016-04-12',
  '2016-04-13',
  '2016-04-14',
  '2016-04-15',
  '2016-04-16',
  '2016-04-17',
  '2016-04-18',
  '2016-04-19',
  '2016-04-20',
  '2016-04-21',
  '2016-04-22',
  '2016-04-23',
  '2016-04-24',
  '2016-04-25',
  '2016-04-26',
  '2016-04-27',
  '2016-04-28',
  '2016-04-29',
  '2016-04-30',
  '2016-05-01',
  '2016-05-02',
  '2016-05-03',
  '2016-05-04',
  '2016-05-05',
  '2016-05-06',
  '2016-05-07',
  '2016-05-08',
  '2016-05-09',
  '2016-05-10',
  '2016-05-11',
  '2016-05-12',
  '2016-05-13',
  '2016-05-14',
  '2016-05-15',
  '2016-05-16',
  '2016-05-17',
  '2016-05-18',
  '2016-05-19',
  '2016-05-20',
  '2016-05-21',
  '2016-05-22',
  '2016-05-23',
  '2016-05-24',
  '2016-05-25',
  '2016-05-26',
  '2016-05-27',
  '2016-05-28',
  '2016-05-29',
  '2016-05-30',
  '2016-05-31',
  '2016-06-01',
  '2016-06-02',
  '2016-06-03',
  '2016-06-04',
  '2016-06-05',
  '2016-06-06',
  '2016-06-07',
  '2016-06-08',
  '2016-06-09',
  '2016-06-10',
  '2016-06-11',
  '2016-06-12',
  '2016-06-13',
  '2016-06-14',
  '2016-06-15',
  '2016-06-16',
  '2016-06-17',
  '2016-06-18',
  '2016-06-19',
  '2016-06-20',
  '2016-06-21',
  '2016-06-22',
  '2016-06-23',
  '2016-06-24',
  '2016-06-25',
  '2016-06-26',
  '2016-06-27',
  '2016-06-28',
  '2016-06-29',
  '2016-06-30',
  '2016-07-01',
  '2016-07-02',
  '2016-07-03',
  '2016-07-04',
  '2016-07-05',
  '2016-07-06',
  '2016-07-07',
  '2016-07-08',
  '2016-07-09',
  '2016-07-10',
  '2016-07-11',
  '2016-07-12',
  '2016-07-13',
  '2016-07-14',
  '2016-07-15',
  '2016-07-16',
  '2016-07-17',
  '2016-07-18',
  '2016-07-19',
  '2016-07-20',
  '2016-07-21',
  '2016-07-22',
  '2016-07-23',
  '2016-07-24',
  '2016-07-25',
  '2016-07-26',
  '2016-07-27',
  '2016-07-28'
];
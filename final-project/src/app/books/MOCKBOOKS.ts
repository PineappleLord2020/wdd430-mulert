import {Book} from './book.model';

export const MOCKBOOKS: any[] = [
  {
    id: '1',
    name: 'The Lightning Thief',
    url: 'https://rickriordan.com/book/the-lightning-thief/',
    release: '2005-06-28T00:00:00.000Z',
    children: [
      {
        id: '2',
        name: 'The Sea of Monsters',
        url: 'https://rickriordan.com/book/the-sea-of-monsters/',
        release: '2006-04-01T00:00:00.000Z'
      },
      {
        id: '3',
        name: "The Titan's Curse",
        url: 'https://rickriordan.com/book/the-titans-curse/',
        release: '2007-05-01T00:00:00.000Z'
      },
      {
        id: '4',
        name: 'Battle of the Labyrinth',
        url: 'https://rickriordan.com/book/the-battle-of-the-labyrinth/',
        release: '2008-05-06T00:00:00.000Z'
      },
      {
        id: '5',
        name: 'The Last Olympian',
        url: 'https://rickriordan.com/book/the-last-olympian/',
        release: '2009-05-05T00:00:00.000Z'
      },
      {
        id: '6',
        name: 'The Chalice of the Gods',
        url: 'https://rickriordan.com/book/the-chalice-of-the-gods/',
        release: '2023-09-26T00:00:00.000Z'
      },
      {
        id: '7',
        name: 'The Wrath of the Triple Goddess',
        url: 'https://rickriordan.com/book/wrath-of-the-triple-goddess/',
        release: '2024-09-24T00:00:00.000Z'
      },
      {
        id: '8',
        name: 'Untitled - Book 8',
        url: 'https://rickriordan.com/series/percy-jackson-and-the-olympians/',
        release: null
      }
    ]
  },
  {
    id: '10',
    name: "The Sorcerer's Stone",
    url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-sorcerers-stone-j-k-rowling/1100036321?ean=9780590353403',
    release: '1997-06-26T00:00:00.000Z',
    children: [
      {
        id: '12', 
        name: 'The Chamber of Secrets', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-chamber-of-secrets-j-k-rowling/1004338523?ean=9780439064866',
        release: '1998-07-02T00:00:00.000Z'
      },
      {
        id: '13', 
        name: 'The Prisoner of Azkaban', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-prisoner-of-azkaban-j-k-rowling/1100178339?ean=9780439136358',
        release: '1999-07-08T00:00:00.000Z'
      },
      {
        id: '14', 
        name: 'The Goblet of Fire', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-goblet-of-fire-j-k-rowling/1100042956?ean=9780439139595',
        release: '2000-07-08T00:00:00.000Z'
      },
      {
        id: '15', 
        name: 'The Order of the Phoenix', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-order-of-the-phoenix-j-k-rowling/1100041270?ean=9780439358064',
        release: '2003-06-21T00:00:00.000Z'
      },
      {
        id: '16', 
        name: 'The Half-Blood Prince', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-half-blood-prince-j-k-rowling/1100079342?ean=9780439784542',
        release: '2005-07-16T00:00:00.000Z'
      },
      {
        id: '17', 
        name: 'Case 6 – A Framework for the View Layer', 
        url: 'https://www.barnesandnoble.com/w/harry-potter-and-the-deathly-hallows-j-k-rowling/1100178133?ean=9780545010221',
        release: '2007-07-21T00:00:00.000Z'
      }
    ]
  },
  {
    id: '20',
    name: 'Fablehaven',
    url: 'http://brandonmull.com/category/fablehaven/#book2',
    release: '2006-06-07T00:00:00.000Z',
    children: [
      {
        id: '21',
        name: 'Rise of the Evening Star',
        url: 'http://brandonmull.com/category/fablehaven/#book3',
        release: '2007-05-31T00:00:00.000Z'
      },
      {
        id: '22',
        name: 'Grip of the Shadow Plague',
        url: 'http://brandonmull.com/category/fablehaven/#book4',
        release: '2008-04-21T00:00:00.000Z'
      },
      {
        id: '23',
        name: 'Secret of the Dragon Sanctuary',
        url: 'http://brandonmull.com/category/fablehaven/#book5',
        release: '2009-03-24T00:00:00.000Z'
      },
      {
        id: '24',
        name: 'Keys to the Demon Prison',
        url: 'http://brandonmull.com/category/fablehaven/#book6',
        release: '2010-03-23T00:00:00.000Z'
      }
    ]
  },
  {
    id: '25',
    name: 'Fires of Invention',
    url: 'https://www.jscottsavage.com/books/mysteries-of-cove/',
    release: '2015-09-29T00:00:00.000Z',
    children: [
      {
        id: '26',
        name: 'Gears of Revolution',
        url: 'https://www.jscottsavage.com/books/mysteries-of-cove/',
        release: '2016-09-20T00:00:00.000Z',
      },
      {
        id: '27',
        name: 'Embers of Destruction',
        url: 'https://www.jscottsavage.com/books/mysteries-of-cove/',
        release: '2017-09-26T00:00:00.000Z',
      },
    ]
  }
];

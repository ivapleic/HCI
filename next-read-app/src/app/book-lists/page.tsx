// app/my-books/page.js
import Wishlist from './wishlist/Wishlist';
import CurrentlyReading from './currently-reading/CurrentlyReading';
import Read from './read/ReadBooks';
import Favourites from './favourites/Favourites';

export default function MyBooksPage() {
  return (
    <div>
      <h1>Moje knjige</h1>
      
      <h2>Lista želja</h2>
      <Wishlist />
      
      <h2>Trenutno čitam</h2>
      <CurrentlyReading />
      
      <h2>Pročitano</h2>
      <Read />

      <h2>Omiljeno</h2>
      <Favourites />
    </div>
  );
}

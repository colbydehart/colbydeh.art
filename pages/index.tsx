import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>ColbyDeH.art</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <p>
        This is my personal website. My name is Colby DeHart and you've entered
        my personal website and i take that quite personally.
      </p>

      <h2>Music</h2>
      <p>
        I play music under the name <strong>Majesty</strong>. Here are some
        links where you can listen to my music:
        <ul>
          <li>
            <a href="https://majesty.bandcamp.com/">Bandcamp</a>
          </li>
          <li>
            <a href="https://sptfy.com/6nRV">Spotify</a>
          </li>
        </ul>
      </p>

      <h2>Pages</h2>
      <ul>
        <li>
          <Link href="/midi_sequencer">MIDI Sequencer</Link>
        </li>
      </ul>

      <hr />
      <footer>Made with ♥ by Colby DeHart</footer>
    </div>
  );
}

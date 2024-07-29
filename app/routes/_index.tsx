import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
import { PiAcornBold } from "react-icons/pi";
import { LogoIcon } from "~/components/LogoIcon";

export default function Index() {
  return (
    <main>
      <nav className="navbar navbar-expand bg-light border-bottom">
        <div className="container-fluid">
          <LogoIcon style={{height:"24pt"}} />
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-light border"><PiAcornBold/></button>
            <button type="button" className="btn btn-light border">Middle</button>
            <button type="button" className="btn btn-light border">Right</button>
        </div>
          <a className="navbar-brand" href="?x">Always expand</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="?x">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="?x">Link</a>
              </li>
            </ul>
            <form role="search">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>
    </main>
  );
}

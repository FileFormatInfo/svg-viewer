# SVG View  [<img alt="Logo for SVG View" src="https://view.svg.zone/favicon.svg" height="96" align="right"/>](https://view.svg.zone/)

[![deploy](https://github.com/VectorLogoZone/svgview/actions/workflows/gcr-deploy.yaml/badge.svg)](https://github.com/VectorLogoZone/svgview/actions/workflows/gcr-deploy.yaml)

## License

[MIT](LICENSE.txt)

## Credits

[![Git](https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg)](https://git-scm.com/ "Version control")
[![Github](https://www.vectorlogo.zone/logos/github/github-ar21.svg)](https://github.com/ "Code hosting")
[![golang](https://www.vectorlogo.zone/logos/golang/golang-ar21.svg)](https://golang.org/ "Programming language")
[![Google Noto Emoji](https://www.vectorlogo.zone/logos/google/google-ar21.svg)](https://github.com/googlefonts/noto-emoji/blob/master/svg/emoji_u1f441.svg "Logo/Favicon")
[![NodePing](https://www.vectorlogo.zone/logos/nodeping/nodeping-ar21.svg)](https://nodeping.com?rid=201109281250J5K3P "Uptime monitoring")
[![npm](https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg)](https://www.npmjs.com/ "JS Package Management")
[![react.js](https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg)](https://reactjs.org/ "UI Framework")
[![TopTal](https://www.vectorlogo.zone/logos/toptal/toptal-ar21.svg)](https://www.toptal.com/designers/subtlepatterns/ "Background pattern")
[![TypeScript](https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg)](https://www.typescriptlang.org/ "Programming Language")
[![VectorLogoZone](https://www.vectorlogo.zone/logos/vectorlogozone/vectorlogozone-ar21.svg)](https://www.vectorlogo.zone/ "Logos")

* [Chakra UI](https://v2.chakra-ui.com/)
* [Vite](https://vitejs.dev/)
* [Phosphor Icons](https://phosphoricons.com/)
* [React Router](https://reactrouter.com/)
* [bartstc/vite-ts-react-template](https://github.com/bartstc/vite-ts-react-template)




import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const query = useQuery();
const value = query.get('paramName');

import { useHistory } from 'react-router-dom';

function setQueryParam(key, value) {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, value);
  history.push(`?${queryParams.toString()}`);
}

function removeQueryParam(key) {
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.delete(key);
  history.push(`?${queryParams.toString()}`);
}

        <IconButton aria-label='Zoom out' icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassMinusBold} />} onClick={ () => zoom("out") }/>
        <IconButton aria-label='Original size' icon={<Icon boxSize="1.75em" as={PiArrowsInCardinalBold} />} onClick={ () => zoom("reset") }/>
        <IconButton aria-label='Zoom In' icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassPlusBold} />} onClick={ () => zoom("in") }/>
        <IconButton aria-label='Max zoom' icon={<Icon boxSize="1.75em" as={PiArrowsOutCardinalBold} />} onClick={ () => zoom("max") }/>

  function zoom(action:string) {
    /*
    let qs = "";

    let currentZoom = parseInt(getQueryStringParam("zoom", "1"));
    if (currentZoom < 0.1) {
      currentZoom = 1;
    }


    if (action === "in") {
      qs = setQueryStringParam("zoom", String(1.25 * currentZoom));
    } else if (action === "out") {
      qs = setQueryStringParam("zoom", String(0.75 * currentZoom));
    } else if (action === "reset") {
      qs = setQueryStringParam("zoom", "1");
    } else if (action === "max") {
      qs = setQueryStringParam("zoom", String(2));  //LATER: calculate
    }
    history.replaceState(null, "", `/preview?${qs}`);
    */
  }

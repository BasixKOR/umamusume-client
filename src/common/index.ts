import { createContext } from "react"

let production = process.env.NODE_ENV === 'production';
let uri;

if(process.env.REACT_APP_URL) {
  // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
  // Required for Netlify Deploy Preview to perform correctly.
  uri = process.env.REACT_APP_URL
}
else if(production) {
  uri = 'https://uma.hitagi.moe'
}
else {
  uri = 'http://localhost:5000'
}
export const baseUri = uri
export const UriContext = createContext(uri)

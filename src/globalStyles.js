import { createGlobalStyle } from "styled-components";



const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
        color: #ECF1F8;
        color: #333;
        --webkit-font-smoothing: antialiased !important;
    }

    ul {
        list-style: none;
    }

    .container {
        
    }
`;



export default GlobalStyle;
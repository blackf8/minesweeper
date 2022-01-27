import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LikeButton from './components/like_button';


//const e = React.createElement;
//const domContainer = document.getElementById('like_button_container');
//ReactDOM.render(e(LikeButton), domContainer);

//const domContainer2 = document.getElementById('like_button_container2');
//ReactDOM.render(React.createElement(LikeButton), domContainer2);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

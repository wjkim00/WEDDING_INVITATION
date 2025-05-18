import IndexPage from "./indexPage";
import ReadyPage from "./readyPage";
import React, { useState } from 'react';
import "../styles/app.css";
import { Helmet } from 'react-helmet-async';

function App() {
    const [readyDone, setReadyDone] = useState(false);

    return (
      <>
        <Helmet>
            <title>원진 ♥ 연진 Wedding Invitation</title>
            <link rel="icon" href="https://cdn.jsdelivr.net/gh/wjkim00/WEDDING_INVITATION/src/assets/favicon.png" />
            <meta property="og:url" content="https://ttokka-wedding.netlify.app" />
            <meta property="og:title" content="원진 ♥ 연진 결혼식에 초대합니다." />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://cdn.jsdelivr.net/gh/wjkim00/WEDDING_INVITATION/src/assets/Thumbnails.webp" />
            <meta property="og:description" content="9월 7일 일요일 11시 JK아트컨벤션" />
        </Helmet>
        {!readyDone && <ReadyPage onFinish={() => setReadyDone(true)} />}
        <div className={readyDone ? 'visible' : 'hidden'}>
          <IndexPage />
        </div>
      </>
    );
  }

  export default App;
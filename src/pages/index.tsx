import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";

interface Props {
  externalUrl: string;
}

const IndexPage = ({ externalUrl }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // iframe이 로드되면 실행
    const onIframeLoad = () => {
      if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;

        // 스타일 추가
        const style = doc.createElement("style");
        style.textContent = `        
          .LTZea {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            opacity: 1;
            visibility: visible;
            transition: 0.2s;
            z-index: 999;
          }
          .LTZea .overlay {
    opacity: 1;
    visibility: visible;
    z-index: 50;
}
.LTZea .overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    visibility: hidden;
    z-index: -1;
    transition: 0.2s;
}
LTZea .container {
    transform: translate(-50%, 0%);
}
@media (max-width: 500px) {
    .LTZea .container {
        max-width: 100vw;
    }
}
.LTZea .container {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 100%);
    max-width: 360px;
    width: 100%;
    height: 436px;
    z-index: 100;
    border-radius: 20px 20px 0px 0px;
    background-color: rgb(255, 255, 255);
    transition: 0.2s;
    padding: 0px;
}
    .LTZea .close-btn {
    position: absolute;
    top: -14px;
    right: 0px;
    transform: translateY(-100%);
    cursor: pointer;
    padding: 6px;
}
    .gARQYv {
    padding: 24px 20px 75px;
    border-radius: 20px 20px 0px 0px;
    background: rgb(255, 255, 255);
    backdrop-filter: blur(7px);
}    
        `;

        // 스타일을 <head>에 삽입
        doc.head.appendChild(style);
      }
    };

    // iframe이 로드되었을 때 처리
    iframe?.addEventListener("load", onIframeLoad);

    return () => {
      iframe?.removeEventListener("load", onIframeLoad);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        style={{
          position: "relative",
          height: 0,
          paddingBottom: "5500px",
          overflow: "hidden",
        }}
      >
        <iframe
          ref={iframeRef}
          src={externalUrl}
          width="100%"
          height="5500px"
          style={{ position: "absolute", top: 0, left: 0, border: "none" }}
          title="nextjsloadingsite"
        />
      </div>
    </>
  );
};

// 서버 측에서 외부 URL을 전달하는 코드
export const getServerSideProps: GetServerSideProps = async () => {
  const externalUrl = "https://molln.in/";

  return {
    props: {
      externalUrl, // props로 외부 URL 전달
    },
  };
};

export default IndexPage;

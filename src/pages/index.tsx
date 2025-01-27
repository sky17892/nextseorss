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
          /* 팝업 스타일 */
          .container {
            position: fixed; /* 화면 고정 */
            top: 50%; /* 세로축 가운데 */
            left: 50%; /* 가로축 가운데 */
            transform: translate(-50%, 0); /* 가로축 중앙 + 세로축 자유 조정 */
            z-index: 9999; /* 최상위 표시 */
            width: 90%; /* 모바일에서 너비 설정 */
            max-width: 400px; /* PC에서 최대 너비 */
            background-color: #fff; /* 팝업 배경 */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 */
            border-radius: 8px; /* 둥근 모서리 */
            padding: 20px; /* 내부 여백 */
          }
          /* 닫기 버튼 */
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
          }
          .inner {
            text-align: center;
          }
          /* 배너 */
          .popup-banner {
            width: 100%;
            height: 150px;
            background-size: cover;
            background-position: center;
          }
          /* 버튼 */
          .btn-box {
            margin-top: 20px;
          }
          .more-btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #ff5722;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
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

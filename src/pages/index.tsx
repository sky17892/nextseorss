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
  top: 0; /* 화면의 가장 위에 고정 */
  left: 50%; /* 가로축 화면 가운데 정렬 */
  transform: translate(-50%, 0); /* 가로축 중앙 정렬 */
  z-index: 9999; /* 최상위 레이어 */
  width: 90%; /* 모바일 화면에서의 기본 너비 */
  max-width: 400px; /* PC 화면에서의 최대 너비 */
  background-color: #fff; /* 팝업 배경색 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 20px; /* 내부 여백 */
}

/* 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 10px; /* 팝업 내부의 상단 기준 위치 */
  right: 10px; /* 팝업 내부의 오른쪽 기준 위치 */
  cursor: pointer; /* 마우스 포인터 커서 설정 */
}

/* 내부 텍스트 */
.inner {
  text-align: center; /* 중앙 정렬 */
}

/* 배너 */
.popup-banner {
  width: 100%; /* 배너 너비 */
  height: 150px; /* 배너 높이 */
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center; /* 배너 중앙 정렬 */
}

/* 버튼 박스 */
.btn-box {
  margin-top: 20px; /* 위와의 간격 */
}

/* 자세히 보기 버튼 */
.more-btn {
  display: inline-block; /* 인라인 블록 */
  padding: 10px 20px; /* 버튼 여백 */
  background-color: #ff5722; /* 버튼 배경색 */
  color: #fff; /* 텍스트 색상 */
  border-radius: 4px; /* 둥근 모서리 */
  cursor: pointer; /* 마우스 포인터 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
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

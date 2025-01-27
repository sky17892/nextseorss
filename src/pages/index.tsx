import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

interface Props {
  externalUrl: string;
}

const IndexPage = ({ externalUrl }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;

    // iframe이 로드되었을 때 실행
    const onIframeLoad = () => {
      if (iframe?.contentDocument) {
        const doc = iframe.contentDocument;

        // 팝업 HTML 구조 삽입
        const popupHTML = `
          <div class="styled__Wrapper-sc-18mg7us-0 LTZea">
            <div class="overlay"></div>
            <div class="container">
              <div class="close-btn">
                <img src="/images/bs-close-btn.svg">
              </div>
              <div class="inner">
                <div class="styled__Wrapper-sc-1m0wcoy-0 gARQYv">
                  <div class="modal-wrapper">
                    <p class="popup-title">첫구매 할인 이벤트</p>
                    <div class="main-title-box">
                      <h1 class="main-title">전 상품 첫 구매시<br>무조건 15% 즉시 할인 !</h1>
                    </div>
                    <div class="date">
                      <p>2025.01.08 ~ 02.07</p>
                    </div>
                    <div class="popup-banner" style="background-image:url(/images/15_coupon.png)"></div>
                    <div class="btn-box">
                      <div class="more-btn">자세히 보기</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        // 팝업 스타일 삽입
        const popupStyle = `
          <style>
            .container {
              position: fixed;
              top: 50%; /* 화면 중간 */
              left: 50%; /* 화면 가로 중앙 */
              transform: translate(-50%, -50%); /* 가로 세로 완전 중앙 정렬 */
              z-index: 9999;
              width: 90%;
              max-width: 400px;
              background-color: #fff;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
              border-radius: 8px;
              padding: 20px;
            }
            .close-btn {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
            }
            .inner {
              text-align: center;
            }
            .popup-banner {
              width: 100%;
              height: 150px;
              background-size: cover;
              background-position: center;
            }
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
          </style>
        `;

        // <head>에 스타일 삽입
        doc.head.insertAdjacentHTML('beforeend', popupStyle);

        // <body>에 팝업 HTML 삽입
        doc.body.insertAdjacentHTML('afterbegin', popupHTML);
      }
    };

    // iframe 로드 이벤트
    iframe?.addEventListener('load', onIframeLoad);

    return () => {
      iframe?.removeEventListener('load', onIframeLoad);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingBottom: '5500px',
          overflow: 'hidden',
        }}
      >
        <iframe
          ref={iframeRef}
          src={externalUrl}
          width="100%"
          height="5500px"
          style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
          title="nextjsloadingsite"
        />
      </div>
    </>
  );
};

// 서버 측에서 외부 URL 전달
export const getServerSideProps: GetServerSideProps = async () => {
  const externalUrl = 'https://molln.in/';

  return {
    props: {
      externalUrl, // props로 외부 URL 전달
    },
  };
};

export default IndexPage;

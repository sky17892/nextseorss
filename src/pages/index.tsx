import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface Props {
  externalUrl777: string;
}

const IndexPage = ({ externalUrl777 }: Props) => {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={{  position: 'relative',  height: 0,  paddingBottom: '865px', overflow: 'hidden' }}>
      <iframe
        src={externalUrl777}
        width="100%"
        height="865px"
        style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
        title="nextjsloadingsite"
      />
    </div>
    </>
  );
};

// 서버 측에서 외부 URL을 전달하는 코드
export const getServerSideProps: GetServerSideProps = async () => {
  const externalUrl777 = "https://molln.in/";

  return {
    props: {
      externalUrl777, // props로 외부 URL 전달
    },
  };
};

export default IndexPage;

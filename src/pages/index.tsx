import { GetServerSideProps } from 'next';

interface Props {
  externalUrl: string;
}

const IndexPage = ({ externalUrl }: Props) => {
  return (
    <div>     
      <iframe
        src={externalUrl}
        width="100%"
        height="5500px"
        style={{ border: 'none' }}
        title="External Site"
      />
    </div>
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

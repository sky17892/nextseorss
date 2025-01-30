// pages/api/content.js (Next.js)
export async function handler(req, res) {
    // 워드프레스 REST API URL
    const wordpressUrl = 'https://talmost.com/wp-json/wp/v2/posts';  // 게시물 목록을 가져오는 API URL

    try {
        // 워드프레스 API로 데이터 요청
        const response = await fetch(wordpressUrl);
        
        // 응답에서 JSON 데이터 가져오기
        const data = await response.json();

        // API 응답이 성공적일 경우, 받은 데이터를 클라이언트로 전송
        res.status(200).json(data);
    } catch (error) {
        // 오류가 발생하면 오류 메시지 전송
        res.status(500).json({ error: 'Failed to fetch data from WordPress' });
    }
}

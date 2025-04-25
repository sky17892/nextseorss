// pages/index.js (Next.js)
import React from 'react';

// 서버 사이드에서 워드프레스 데이터 가져오기
export async function getServerSideProps() {
    // Next.js API로부터 워드프레스 데이터 가져오기
    const res = await fetch('https://n12345678.vercel.app/api/content');
    const posts = await res.json();

    //// 페이지의 props로 워드프레스 게시물 전달
    return {
        props: {
            posts,
        },
    };
}

export default function HomePage({ posts }) {
    return (
        <div>
            <h1>WordPress Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

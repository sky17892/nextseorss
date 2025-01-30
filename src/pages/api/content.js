// pages/api/content.js (Next.js)
export async function handler(req, res) {
    const data = await fetch('https://n12345678.vercel.app/data');
    const json = await data.json();
    res.status(200).json(json);
}

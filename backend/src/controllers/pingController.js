export async function pingCheck(req, res) {
    return res.status(200).json({ message: 'pong' });
}
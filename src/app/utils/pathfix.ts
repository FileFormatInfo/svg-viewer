
// WTF is this?  A hack to workaround next.js static export bizarre behavior
export const suffix = process.env.NODE_ENV === 'production' ? '.html' : '';
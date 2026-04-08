const namedEntities: Record<string, string> = {
  '&quot;': '"',
  '&#039;': "'",
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&hellip;': '…',
  '&ndash;': '–',
  '&mdash;': '—',
  '&nbsp;': ' ',
};

export const decodeHtml = (text: string): string => {
  if (!text) {
    return '';
  }

  let decoded = text;

  Object.entries(namedEntities).forEach(([entity, char]) => {
    decoded = decoded.split(entity).join(char);
  });

  decoded = decoded.replace(/&#(\d+);/g, (_, dec) => {
    const code = Number(dec);
    return Number.isNaN(code) ? _ : String.fromCharCode(code);
  });

  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    const code = parseInt(hex, 16);
    return Number.isNaN(code) ? _ : String.fromCharCode(code);
  });

  return decoded;
};
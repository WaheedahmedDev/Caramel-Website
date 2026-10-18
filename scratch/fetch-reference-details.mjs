async function inspect() {
  const jsRes = await fetch('https://caramel-ten.vercel.app/assets/index-tDfUIxp2.js');
  const js = await jsRes.text();
  console.log('JS length:', js.length);

  const urls = js.match(/https?:\/\/[^\s"'<>]+/g) || [];
  console.log('Extracted URLs:', [...new Set(urls)]);

  const images = js.match(/\/assets\/[^\s"']+\.(png|webp|avif|jpg|svg)/g) || [];
  console.log('Extracted images:', [...new Set(images)]);

  const cssRes = await fetch('https://caramel-ten.vercel.app/assets/index-BxgarOW6.css');
  const css = await cssRes.text();
  console.log('CSS length:', css.length);

  const colors = css.match(/#[0-9a-fA-F]{3,8}/g) || [];
  console.log('Unique colors in CSS:', [...new Set(colors)]);

  // Let's also look for text strings like 'Developed by', 'Waheed', etc.
  const waheedMatches = js.match(/.{0,50}Waheed.{0,50}/g) || [];
  console.log('Waheed matches:', waheedMatches);

  const fbMatches = js.match(/.{0,50}facebook.{0,50}/g) || [];
  console.log('Facebook matches:', fbMatches);

  const tiktokMatches = js.match(/.{0,50}tiktok.{0,50}/g) || [];
  console.log('TikTok matches:', tiktokMatches);

  const instaMatches = js.match(/.{0,50}instagram.{0,50}/g) || [];
  console.log('Instagram matches:', instaMatches);

  const waMatches = js.match(/.{0,50}whatsapp.{0,50}/g) || [];
  console.log('WhatsApp matches:', waMatches);

  const phoneMatches = js.match(/.{0,40}phoneNumber.{0,100}/g) || [];
  console.log('Phone matches:', phoneMatches);
}

inspect().catch(console.error);

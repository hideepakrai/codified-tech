import sharp from 'sharp';

console.log('Sharp version:', sharp.version);
try {
  console.log('Sharp imported successfully');
} catch (e) {
  console.error('Error:', e);
}

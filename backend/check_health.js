(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/health');
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();

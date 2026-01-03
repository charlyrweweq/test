const CHECK_EVERY_MS = 6000; // 10 segundos

let lastSignature = null;

async function checkServer() {
  try {
    const res = await fetch(location.href, {
      method: "HEAD",
      cache: "no-store"
    });

    const etag = res.headers.get("ETag");
    const lastModified = res.headers.get("Last-Modified");

    const signature = etag || lastModified;

    if (!signature) return;

    if (!lastSignature) {
      lastSignature = signature;
      return;
    }

    if (signature !== lastSignature) {
      console.log("🔄 Cambio detectado en el servidor");
      location.reload();
    }
  } catch (e) {
    console.warn("No se pudo comprobar el servidor", e);
  }
}

setInterval(checkServer, CHECK_EVERY_MS);

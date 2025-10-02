import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

function toFetchLike(res) {
  return {
    ok: res.status >= 200 && res.status < 300,
    status: res.status,
    headers: { get: (name) => res.headers?.[name.toLowerCase()] ?? null },
    json: async () => res.data,
    raw: res,
  };
}

export async function api(path, opts = {}, _retry = false) {
  const method = (opts.method || "GET").toLowerCase();
  const data =
    opts.body !== undefined
      ? typeof opts.body === "string"
        ? JSON.parse(opts.body)
        : opts.body
      : undefined;

  try {
    const res = await client.request({
      url: path,
      method,
      data,
      headers: opts.headers,
    });
    return toFetchLike(res);
  } catch (err) {
    const status = err.response?.status ?? 0;
    // Try one refresh when unauthorized
    if (status === 401 && !_retry && path !== "/api/users/refresh") {
      try {
        await client.post("/api/users/refresh");
        const res = await client.request({
          url: path,
          method,
          data,
          headers: opts.headers,
        });
        return toFetchLike(res);
      } catch (refreshErr) {
        // fall through to session-expired flow
      }
    }
    // Emit a global session-expired event for uniform UX
    if (status === 401) {
      window.dispatchEvent(
        new CustomEvent("session-expired", { detail: { path } })
      );
    }
    if (err.response) return toFetchLike(err.response);
    return {
      ok: false,
      status: 0,
      headers: { get: () => null },
      json: async () => ({ message: err.message }),
    };
  }
}

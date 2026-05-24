import type { Config } from "@react-router/dev/config";

export default {
  prerender: ["/", "/open.html", "/random.html", "/view.html"],
  ssr: false,
} satisfies Config;

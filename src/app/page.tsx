import { css } from "@/styled-system/css";
import { vstack } from "@/styled-system/patterns";

export default function Home() {
  return (
    <main
      className={vstack({
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "gray.900",
      })}
    >
      <h1
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
          color: "slate.200",
        })}
      >
        OmniPlay
      </h1>
    </main>
  );
}

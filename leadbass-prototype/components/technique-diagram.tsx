import { ArrowDown, ArrowUp } from "lucide-react";
import type { TechniqueVisual } from "@/lib/content";

function Strings({ target }: { target: "E" | "A" }) {
  return (
    <div className="technique-strings">
      {["E", "A", "D", "G"].map((string) => (
        <div key={string} className={string === target ? "target" : ""}>
          <span>{string}</span>
          <i />
        </div>
      ))}
    </div>
  );
}

export function TechniqueDiagram({ visual }: { visual: TechniqueVisual }) {
  if (visual === "pick") {
    return (
      <div className="technique-diagram">
        <figure>
          <strong>ピックの持ち方</strong>
          <div className="technique-scene" aria-hidden="true">
            <span className="technique-digit pick-index">人差し指</span>
            <span className="pick-tip-shape" />
            <span className="technique-digit pick-thumb">親指</span>
          </div>
          <figcaption>人差し指と親指で挟み、先を少し出す</figcaption>
        </figure>
        <figure>
          <strong>ピックを動かす方向</strong>
          <div className="technique-scene" aria-hidden="true">
            <Strings target="E" />
            <div className="technique-arrows pick-directions">
              <ArrowDown size={24} />
              <ArrowUp size={24} />
            </div>
          </div>
          <figcaption>↓ ダウンは細い弦側へ ／ ↑ アップは太い弦側へ</figcaption>
        </figure>
      </div>
    );
  }

  if (visual === "two-finger") {
    return (
      <div className="technique-diagram">
        <figure>
          <strong>親指の置き方</strong>
          <div className="technique-scene" aria-hidden="true">
            <span className="technique-pickup">ピックアップ</span>
            <Strings target="A" />
            <span className="technique-digit anchor-thumb">親指</span>
          </div>
          <figcaption>親指をピックアップの縁に軽く置く</figcaption>
        </figure>
        <figure>
          <strong>人差し指と中指の動き</strong>
          <div className="technique-scene" aria-hidden="true">
            <Strings target="A" />
            <div className="technique-arrows finger-directions">
              <span><ArrowUp size={20} /> 人差し指</span>
              <span><ArrowUp size={20} /> 中指</span>
            </div>
          </div>
          <figcaption>人差し指と中指で、交互に3弦（A）から4弦（E）の方向へ</figcaption>
        </figure>
      </div>
    );
  }

  return (
    <div className="technique-diagram">
      <figure>
        <strong>サムピング（横から見た図）</strong>
        <div className="technique-scene slap-scene" aria-hidden="true">
          <div className="slap-string"><span>4弦</span><i /></div>
          <span className="technique-digit slap-thumb">親指の側面</span>
          <ArrowDown className="slap-arrow" size={24} />
          <span className="slap-board">指板</span>
        </div>
        <figcaption>親指の側面を弦に当て、すぐ離す</figcaption>
      </figure>
      <figure>
        <strong>プル（横から見た図）</strong>
        <div className="technique-scene slap-scene" aria-hidden="true">
          <div className="slap-string"><span>2弦</span><i /></div>
          <span className="technique-digit pull-index">人差し指</span>
          <ArrowUp className="slap-arrow" size={24} />
          <span className="slap-board">指板</span>
        </div>
        <figcaption>人差し指を弦の下に浅くかけ、指板から離す方向に引く</figcaption>
      </figure>
    </div>
  );
}

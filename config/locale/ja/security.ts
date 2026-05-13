export default {
  title: "セキュリティ",
  pages: {
    overview: "概要",
  },
  introduction: {
    title: "統一セキュリティ（Security）",
    description:
      "@surgeteam/security は Surge Next.js Framework の統一セキュリティ機能パッケージです。<nosecone>@nosecone/next</nosecone> を基盤に、defaults、複数パッケージ設定のマージ、ミドルウェア統合を提供します。",
    featuresTitle: "特長",
    features: {
      headers:
        "🛡️ セキュリティヘッダー - Next.js ミドルウェアで CSP、Referrer-Policy、HSTS、X-Frame-Options、COEP/COOP/CORP などを注入",
      nonce:
        "🔒 CSP nonce - リクエストごとに nonce を生成して CSP に注入し、<code>x-nonce</code> 経由で Server Components に渡す",
      defaults:
        "⚙️ デフォルト - <code>@nosecone/next</code> の defaults をそのまま利用",
      merge:
        "🧩 複数パッケージのマージ - <code>mergeSecurityOptions()</code> が「緩いマージ」規則で設定を統合",
      middleware:
        "🏭 ミドルウェア工場 - <code>createSecurityMiddleware(options?)</code> で Next.js / NEMO 互換のミドルウェアを生成",
      types:
        "🧾 型の再エクスポート - <code>@surgeteam/security/proxy</code> から <code>SecurityOptions</code> を提供し、各パッケージが要件を宣言できる",
    },
    conceptsTitle: "コア概念",
    tradeoffsTitle: "設計上のトレードオフ",
    tradeoffsDescription:
      "インフラ層としてセキュリティヘッダーは単一の出口であり、複数パッケージが要件を追加できます。結合を局所化するため「アプリが収集し、本パッケージが適用する」方式を取ります：",
    tradeoffsItems: {
      appCollect:
        "アプリ層が各パッケージの *SecurityOptions を収集してマージし、ミドルウェアで一括適用します。",
      otherPkgDeclare:
        "他のパッケージは要件を宣言して export するだけで、マージロジックやミドルウェア形状に依存しません。",
    },
    noseconeTitle: "@nosecone/next との関係",
    noseconeDescription:
      "内部は <code>createMiddleware</code> と <code>defaults</code> に基づき、安定した統合面として <code>mergeSecurityOptions</code> と <code>createSecurityMiddleware</code> を提供します。",
    mergeTitle: "緩いマージ戦略",
    mergeDescription:
      "複数パッケージが設定を提供する場合、<code>mergeSecurityOptions(pkgA, pkgB, ...)</code> を使用します。衝突時はより緩い（許容的な）側を選び、必要な機能がブロックされないようにします。",
    mergeItems: {
      csp: "CSP - 指令の source 配列をマージ・重複排除し、'none' を正規化。CSP=false で無効化も可能。",
      policies:
        "ポリシー - Referrer-Policy / COEP / COOP / CORP / X-Frame-Options はより許容的なポリシーを選択。",
      hsts: "HSTS - maxAge は小さい値、includeSubDomains/preload はどちらかが false なら false。",
    },
    nonceTitle: "Nonce の伝播",
    nonceDescription:
      "ミドルウェアが nonce を生成して CSP の <code>script-src</code> に注入し、<code>x-nonce</code> で転送します。Server Components では <code>getNonce()</code> で取得し、<code>&lt;Script nonce=&quot;...&quot; /&gt;</code> に渡します。",
  },
};

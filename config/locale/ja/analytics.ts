export default {
  introduction: {
    title: "統一された分析（Analytics）",
    docCta: "ドキュメントを読む →",
    lead: "@surgeteam/analytics は Surge Next.js Framework の統一分析機能パッケージです。アダプタアーキテクチャを基盤に、環境変数スイッチ、真のコード分割、CSP nonce、セキュリティ設定エクスポートを提供し、security / observability と連携できます。",
    sections: {
      features: {
        title: "特長",
        items: {
          pluggable:
            "🔌 プラガブル設計：アダプタは置換/併用が可能。環境変数で切り替え、アプリコードは変更不要",
          openInterface:
            "📦 オープンなインターフェース：AnalyticsProvider の customOptions で任意設定を透過",
          cspNonce:
            "🔒 CSP Nonce：アプリから nonce を受け取り、厳格な CSP 下でも第三者スクリプトを安全に実行",
          securityHeaders:
            "🛡️ セキュリティヘッダー：analyticsSecurityOptions をエクスポートし CSP を一括マージ",
          nextConfig:
            "⚙️ Next.js 設定：withAnalyticsConfig を next.config.ts に合成可能",
          instrumentation:
            "🔌 Instrumentation：server/client hooks で起動時初期化を支援",
          codeSplitting:
            "📊 コード分割：環境変数が未設定ならアダプタコードを読み込まず、サイズ/負荷を最小化",
        },
      },
      concepts: {
        title: "コア概念",
        items: {
          adapterArchitecture: {
            title: "アダプタアーキテクチャ",
            desc: "各プラットフォームは adapters/service-name/ に分離し、環境変数や CSP 要件も個別。アプリ側は Provider の統一 API を利用します。",
          },
          envToggle: {
            title: "環境変数スイッチとオンデマンド読み込み",
            desc: "有効化は環境変数で決定。無効時は関連コードがバンドル/読み込みされず、性能最適化になります。",
          },
          cspNonce: {
            title: "CSP nonce フロー",
            desc: "ルートレイアウト等で nonce を取得し customOptions で渡し、アダプタが Script へ転送します。",
          },
          securityOptions: {
            title: "セキュリティ設定のマージ",
            desc: "proxy.ts（または同等）で analyticsSecurityOptions を取り込み、他パッケージとマージしてヘッダーを注入します。",
          },
        },
      },
    },
  },
};

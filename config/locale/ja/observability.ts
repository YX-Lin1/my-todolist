export default {
  introduction: {
    title: "統一された可観測性（Observability）",
    docCta: "ドキュメントを読む →",
    lead: "@surgeteam/observability は Surge Next.js Framework の統一可観測性機能パッケージです。アダプタアーキテクチャを基盤に、環境変数スイッチ、真のコード分割、エラー追跡・性能監視・セッションリプレイ・統一ログ API、および CSP 向けセキュリティ設定エクスポートを提供します。",
    sections: {
      features: {
        title: "特長",
        items: {
          pluggable:
            "🔌 プラガブル設計：アダプタは置換/併用が可能。環境変数で切り替え、アプリコードは変更不要",
          openInterface:
            "📦 オープン設定：register 関数でプラットフォーム固有の設定を渡せます",
          errorTracking:
            "🐛 エラー追跡：サーバー/クライアントを横断して統一的に捕捉・報告",
          performance:
            "📊 性能監視：ページ読み込みやリクエスト時間などの重要指標を追跡",
          replay:
            "🎥 セッションリプレイ：ユーザー操作を記録し再現・デバッグを支援",
          logger:
            "📝 統一ログ API：Observability.logger は複数レベルを提供し、アダプタ変更でも API は不変",
          securityHeaders:
            "🛡️ セキュリティヘッダー：observabilitySecurityOptions をエクスポートし CSP を一括マージ",
          nextConfig:
            "⚙️ Next.js 設定：withObservabilityConfig を next.config.ts に合成可能",
          instrumentation:
            "🔌 Instrumentation：Node.js / Edge をサポートし、任意でクライアントのルート遷移追跡も可能",
          codeSplitting:
            "📊 コード分割：環境変数が未設定ならアダプタコードを読み込まず、サイズ/負荷を最小化",
        },
      },
      concepts: {
        title: "コア概念",
        items: {
          adapterArchitecture: {
            title: "アダプタアーキテクチャ",
            desc: "各プラットフォームは adapters/service-name/ に分離し、環境変数や CSP 要件も個別。アプリ側は統一 API を利用します。",
          },
          stableInterfaces: {
            title: "安定インターフェース：ログと例外捕捉",
            desc: "アプリは Observability.logger と Observability.captureException に依存。プラットフォーム切替はアダプタ設定のみ変更します。",
          },
          envToggle: {
            title: "環境変数スイッチとオンデマンド読み込み",
            desc: "有効化は環境変数で決定。無効時は関連コードがバンドル/読み込みされず、性能最適化になります。",
          },
          securityOptions: {
            title: "セキュリティ設定のマージ",
            desc: "proxy.ts（または同等）で observabilitySecurityOptions を取り込み、他パッケージとマージしてヘッダーを注入します。",
          },
        },
      },
    },
  },
};

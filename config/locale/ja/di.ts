export default {
  title: "依存性注入",
  pages: {
    overview: "概要",
  },
  introduction: {
    title: "依存性注入（Dependency Injection）",
    description:
      "@surgeteam/di は Surge Next.js Framework の統一依存性注入パッケージです。軽量・型安全・スコープ対応の DI ツールキットとして、<token>token()</token> でバインディングを宣言し、<defineResources>defineResources()</defineResources> でリソースグラフを一括定義し、<createContainer>createContainer()</createContainer> でリクエストごとのコンテナビューを生成します。",
    featuresTitle: "特長",
    features: {
      typeSafe:
        "🔒 型安全 - <code>Token<lt></lt>T<gt></gt></code> + <code>resolver.get(token)</code> で型の整合性を保証",
      resourceGraph:
        "🧩 宣言的なグラフ - <code>defineResources(<lbrace></lbrace> UserRepo: ... <rbrace></rbrace>)</code> で tokens / register / getters を生成",
      lifetimes:
        "🧭 3 つのライフタイム - process（プロセス単位の単一）、request（リクエスト単位でキャッシュ）、transient（get ごとに生成）",
      testing:
        "🧪 テスト向け - <code>RegistryManager.setOverride()</code> で任意 token の実装を差し替え可能",
      cycleDetect:
        "🔁 循環依存検出 - 同期の循環依存は明確な依存チェーンで例外を投げます",
    },
    conceptsTitle: "コア概念",
    tokenTitle: "Token：バインディングの一意識別子",
    tokenDescription:
      "<code>token(name)</code> は一意な <code>Symbol</code> を含む <code>Token<lt></lt>T<gt></gt></code> を返します。同名でも Symbol は共有されないため、同じ binding は同じ token インスタンスを再利用する必要があります。",
    registryTitle: "Registry と Resolver：登録と解決の分離",
    registryItems: {
      manager:
        "<code>RegistryManager</code>：登録情報（factory + scope）と override の保存のみを担当。",
      resolver:
        "<code>Resolver</code>：<code>get(token)</code> の解決、スコープ委譲、キャッシュを担当。",
    },
    resolverTitle: "二段 Resolver：process と request",
    resolverIntro: "createContainer() の内部で作成されます：",
    resolverItems: {
      process:
        "process resolver：process scope を解決するグローバル単一（プロセス単位でキャッシュ）。",
      request:
        "request resolver：コンテナファクトリ呼び出しごとに生成され、request/transient scope を解決（リクエスト単位でキャッシュ）。",
    },
    resolverSummary:
      "これにより process 単一は全リクエストで共有され、request リソースがプロセス全体のキャッシュになることを防ぎます。",
  },
};

export default {
  title: "HTTP クライアント",
  pages: {
    overview: "概要",
    users: "Users（Client + React Query）",
  },
  introduction: {
    title: "HTTP クライアント（HTTP Client）",
    docCta: "ドキュメントを読む →",
    description:
      "@surgeteam/http-client は Surge Next.js Framework の統一 HTTP クライアント機能パッケージです。アダプターアーキテクチャにより通信実装とリクエスト設定・処理を分離し、標準の Fetch ベースアダプターに加えて、ランタイムや要件に応じたカスタム拡張にも対応します。",
    featuresTitle: "特長",
    features: {
      adapter:
        "🔌 アダプターアーキテクチャ：標準 Fetch アダプター、カスタム/拡張に対応。",
      interface:
        "📐 IHttpClient インターフェース：DI と単体テストの mock が容易。",
      types: "🔒 型安全：TypeScript の型推論と型検査を包括サポート。",
      interceptors:
        "🔌 インターセプター：リクエスト/レスポンスを横断的に統一処理。",
      timeoutAbort:
        "⏱️ タイムアウト + AbortSignal：タイムアウト制御とキャンセル対応。",
      nextjs: "🔄 Next.js 連携：revalidate や tags など fetch 拡張に対応。",
      errorHandling: "🛡️ エラーハンドリング：充実したエラー型とガードを提供。",
    },
    conceptsTitle: "コア概念",
    instanceTitle: "HttpClient インスタンス",
    instanceDesc:
      "HttpClient 作成時に、baseURL や timeout などの基本設定を渡せます。",
    methodsTitle: "リクエストメソッド",
    methodsDesc:
      "主要な HTTP 動詞に対して、get / post / put / patch / delete などのメソッドを提供します。",
    transformsTitle: "インターセプターと変換器",
    transforms: {
      requestInterceptor:
        "リクエストインターセプター：送信前に設定変更やコンテキスト注入を行う。",
      responseInterceptor:
        "レスポンスインターセプター：返却前にステータスやエラーを統一処理する。",
      requestTransformer: "リクエスト変換器：送信前にデータ形式を変換する。",
      responseTransformer: "レスポンス変換器：受信後にデータ構造を変換する。",
    },
    errorTitle: "エラーハンドリング",
    errorDesc:
      "HttpClientError により、統一エラーコード、リクエスト/レスポンス文脈、型ガードを提供し、アプリ層で安定した例外分岐を実現します。",
    adapterTitle: "アダプターアーキテクチャ",
    adapterDesc:
      "HttpClient は通信実装を Adapter として抽象化し、上位 API を保ったまま実装切替を可能にします。標準は Fetch で、明示指定やカスタム関数の注入にも対応します。",
    sections: {
      tryDemos: {
        title: "デモを確認する",
        description: "具体的なデモページに進みます:",
      },
    },
  },
  users: {
    title: "Users（Client Component デモ）",
    lead: "Client Component では getBrowserUsersApi() + React Query で API を呼びます。Server Component は services 経由で http-client を利用してください。",
    formLabel: "ユーザー id（数字の文字列）",
    submit: "読み込み",
    noIdHint:
      "有効な snowflake 形式の id を入力して送信してください。getBrowserUsersApi().get('{ path: { id } }') が呼ばれます。",
    loading: "読み込み中...",
    resultTitle: "レスポンス",
    friendly: {
      title: "ユーザープロファイル",
      timeZone: "表示タイムゾーン: {timeZone}",
      fullName: "氏名",
      email: "メールアドレス",
      id: "ユーザー id",
      createdAt: "作成日時",
      updatedAt: "更新日時",
    },
    errorTitle: "リクエストに失敗しました",
    errorHint: "API 設定と id の存在を確認してください。",
  },
};

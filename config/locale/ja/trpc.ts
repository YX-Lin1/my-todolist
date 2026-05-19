export default {
  title: "tRPC",
  pages: {
    overview: "概要",
    users: "Users（Client + tRPC）",
    login: "Login（Client + tRPC）",
  },
  introduction: {
    title: "tRPC",
    docCta: "公式ドキュメントを読む →",
    description:
      "本フレームワークは Next.js App Router に tRPC を統合します。共有の AppRouter 型で手続き呼び出しを型安全にし、@trpc/react-query と TanStack Query を組み合わせて Client Component から型安全にクエリ・ミューテーションを実行します。HTTP エンドポイントは /api/trpc、transformer は superjson です。",
    featuresTitle: "特長",
    features: {
      endToEnd:
        "エンドツーエンドの型安全：Router とクライアント hooks が同じ TypeScript 型を共有。",
      reactQuery:
        "React Query 連携：useQuery / useMutation など馴染みのパターンとキャッシュ。",
      batching:
        "HTTP バッチ：httpBatchLink が同一ティック内のリクエストをまとめる。",
      superjson:
        "superjson：Date や Map などサーバー・クライアント間でリッチな型を扱う。",
      context:
        "リクエストコンテキスト：createTRPCContext でコンテナや認証などを注入可能。",
      serverGuidance:
        "サーバー優先：Server Component / Server Action ではドメインサービスを直接呼ぶことを優先し、tRPC caller は RPC 境界が意図的な場合に限定。",
    },
    conceptsTitle: "コア概念",
    routerTitle: "App router",
    routerDesc:
      "appRouter は library/trpc/routers でサブルーター（例: users）を集約。AppRouter 型は createTRPCReact に利用されます。",
    clientTitle: "React クライアント",
    clientDesc:
      "Client Component では @/library/trpc/client から trpc を import し、trpc.xxx.yyy.useQuery / useMutation を使用。TRPCProvider はルートレイアウトで既に提供（ReactQueryProvider の子としてネスト）。",
    procedureTitle: "Procedure と入力検証",
    procedureDesc:
      "Procedure は publicProcedure 等で構築し、Zod などで input を検証します（例: users.get は UsersGetRequestSchema）。",
    apiTitle: "HTTP アダプター",
    apiDesc:
      "Next.js Route Handler（app/api/trpc/[trpc]/route.ts）で fetchRequestHandler を公開し、エンドポイントは /api/trpc。",
    sections: {
      tryDemos: {
        title: "デモを確認する",
        description: "具体的なデモページに進みます:",
      },
    },
  },
  users: {
    title: "Users（Client Component デモ）",
    lead: "Client Component では trpc.users.get.useQuery で tRPC を呼びます。Server Component は services や getTRPCCaller のドキュメントに従ってください。",
    formLabel: "ユーザー id（数字の文字列）",
    submit: "読み込み",
    noIdHint:
      "有効な snowflake 形式の id を入力して送信してください。trpc.users.get.useQuery('{ id }') が呼ばれます。",
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
    errorDetailsLabel: "詳細",
  },
};
